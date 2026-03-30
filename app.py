import os
import random
import secrets
import datetime
from datetime import timedelta
from functools import wraps
import requests
from flask import Flask, request, jsonify, Response
from flask_cors import CORS

from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)

from pymongo import MongoClient
from bson.objectid import ObjectId
import bcrypt

from bson.objectid import ObjectId
from werkzeug.utils import secure_filename
import gridfs

# Load environment variables from a local .env file (optional)
try:
    from dotenv import load_dotenv

    load_dotenv()
except Exception:
    # If python-dotenv isn't installed, we simply rely on real environment variables.
    pass



# ---------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------

MONGODB_URI = os.getenv("MONGODB_URI")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")



# Optional: restrict registration to your school domain
ALLOWED_EMAIL_DOMAIN = "@email.sc.edu", "@cse.sc.edu", "@sc.edu" # change if needed

client = MongoClient(MONGODB_URI)
db = client["acm-db"]  # ACM-specific DB

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=8)

jwt = JWTManager(app)

fs = gridfs.GridFS(db)

# ---------------------------------------------------------------------
# Health Check
# ---------------------------------------------------------------------

@app.route("/health")
def health():
    return "ok", 200


# ---------------------------------------------------------------------
# Register (ACM Members)
# ---------------------------------------------------------------------

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}

    required_fields = ["first_name", "last_name", "school_email", "password"]
    missing = [f for f in required_fields if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    email = data["school_email"].lower().strip()

    # Enforce school email
    if not email.endswith(ALLOWED_EMAIL_DOMAIN):
        return jsonify({
            "error": f"Registration requires a valid {ALLOWED_EMAIL_DOMAIN} email"
        }), 400

    users = db.users

    if users.find_one({"school_email": email}):
        return jsonify({"error": "Email already registered"}), 400

    # Hash password
    password_hash = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    user = {
        "user_id": "".join(random.choices("abcdefghijklmnopqrstuvwxyz0123456789", k=16)),
        "first_name": data["first_name"],
        "last_name": data["last_name"],
        "school_email": email,
        "password": password_hash,
        "role": "member",  # member | admin | super
        "created_at": datetime.datetime.utcnow()
    }

    users.insert_one(user)

    return jsonify({"message": "Registration successful"}), 201


# ---------------------------------------------------------------------
# Login
# ---------------------------------------------------------------------

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}

    email = data.get("school_email", "").lower().strip()
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = db.users.find_one({"school_email": email})
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(
        identity=str(user["_id"]),
        additional_claims={
            "role": user.get("role", "member"),
            "email": user["school_email"]
        }
    )

    return jsonify({
        "access_token": access_token,
        "user": {
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "school_email": user["school_email"],
            "role": user.get("role", "member")
        }
    }), 200


# ---------------------------------------------------------------------
# Admin Guard
# ---------------------------------------------------------------------

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if request.method == "OPTIONS":
            return Response(status=200)

        @jwt_required()
        def protected():
            claims = get_jwt()
            if claims.get("role") not in ["admin", "super"]:
                return jsonify({"error": "Admins only"}), 403
            return fn(*args, **kwargs)

        return protected()

    return wrapper


# ---------------------------------------------------------------------
# Get Current User (JWT-based)
# ---------------------------------------------------------------------

@app.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()

    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "user_id": user.get("user_id"),
        "first_name": user.get("first_name"),
        "last_name": user.get("last_name"),
        "school_email": user.get("school_email"),
        "role": user.get("role", "member"),
        "created_at": user.get("created_at")
    }), 200


# ---------------------------------------------------------------------
# Example Admin-Only Route
# ---------------------------------------------------------------------

@app.route("/admin/users", methods=["GET"])
@admin_required
def list_users():
    users = []
    for u in db.users.find({}, {"password": 0}):
        u["_id"] = str(u["_id"])
        users.append(u)

    return jsonify(users), 200



ALLOWED_CATEGORIES = {"workshop", "meeting", "social", "hackathon", "speaker"}

def validate_event_fields(payload):
    required = ["title", "description", "date", "time", "location", "category"]
    missing = [k for k in required if not payload.get(k)]
    if missing:
        return f"Missing fields: {', '.join(missing)}"

    if payload["category"] not in ALLOWED_CATEGORIES:
        return f"Invalid category"

    return None


def serialize_event(e):
    return {
        "id": str(e["_id"]),
        "title": e["title"],
        "description": e["description"],
        "date": e["date"],
        "time": e["time"],
        "location": e["location"],
        "category": e["category"],
        "imageUrl": f"/events/image/{e['imageFileId']}" if e.get("imageFileId") else None,
        "link": e.get("link"),  # ✅ OPTIONAL LINK
    }


# ---- LIST EVENTS ----
@app.route("/events", methods=["GET"])
def list_events():
    docs = db.events.find({}).sort("date", 1)
    return jsonify([serialize_event(d) for d in docs]), 200


# ---- GET SINGLE EVENT ----
@app.route("/events/<event_id>", methods=["GET"])
def get_event(event_id):
    doc = db.events.find_one({"_id": ObjectId(event_id)})
    if not doc:
        return jsonify({"error": "Event not found"}), 404
    return jsonify(serialize_event(doc)), 200


@app.route("/events/image/<file_id>", methods=["GET"])
def get_event_image(file_id):
    try:
        fid = ObjectId(file_id)
    except Exception:
        return jsonify({"error": "Invalid file id"}), 400

    try:
        grid_out = fs.get(fid)
    except Exception:
        return jsonify({"error": "Image not found"}), 404

    content_type = getattr(grid_out, "content_type", None) or "application/octet-stream"
    return Response(grid_out.read(), mimetype=content_type)


DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")


def post_event_to_discord(event_doc):
    if not DISCORD_WEBHOOK_URL:
        print("DISCORD_WEBHOOK_URL is not set, skipping Discord post.")
        return

    image_url = None
    if event_doc.get("imageFileId"):
        image_url = f"https://api.abdorruhman.dev/events/image/{event_doc['imageFileId']}"

    event_link = event_doc.get("link")

    embed = {
        "title": f"New ACM Event: {event_doc['title']}",
        "description": event_doc["description"],
        "color": 0x8C1D40,
        "fields": [
            {"name": "Date", "value": event_doc["date"], "inline": True},
            {"name": "Time", "value": event_doc["time"], "inline": True},
            {"name": "Location", "value": event_doc["location"], "inline": False},
            {"name": "Category", "value": event_doc["category"].title(), "inline": True},
        ],
        "footer": {"text": "ACM at UofSC"}
    }
    if event_link:
        embed["url"] = event_link

    if image_url:
        embed["image"] = {"url": image_url}

    payload = {
        "content": "A new ACM event has been posted.",
        "embeds": [embed]
    }

    try:
        response = requests.post(DISCORD_WEBHOOK_URL, json=payload, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"Failed to post event to Discord: {e}")

# ---- CREATE EVENT ----
@app.route("/events", methods=["POST"])
@admin_required
def create_event():
    payload = request.form.to_dict()
    image = request.files.get("image")

    err = validate_event_fields(payload)
    if err:
        return jsonify({"error": err}), 400

    image_file_id = None
    if image:
        image_file_id = fs.put(
            image.stream,
            filename=secure_filename(image.filename),
            content_type=image.mimetype,
        )

    now = datetime.datetime.utcnow().isoformat()

    doc = {
        "title": payload["title"],
        "description": payload["description"],
        "date": payload["date"],
        "time": payload["time"],
        "location": payload["location"],
        "category": payload["category"],
        "imageFileId": image_file_id,
        "link": payload.get("link") or None,
        "created_at": now,
        "updated_at": now,
    }

    res = db.events.insert_one(doc)
    saved_event = db.events.find_one({"_id": res.inserted_id})

    # Post to Discord after successful save
    post_event_to_discord(saved_event)

    return jsonify(serialize_event(saved_event)), 201

# ---- UPDATE EVENT ----
@app.route("/events/<event_id>", methods=["PUT"])
@admin_required
def update_event(event_id):
    payload = request.form.to_dict()
    image = request.files.get("image")

    update = {}

    # Normal required fields (ignore empty = unchanged)
    for k in ["title", "description", "date", "time", "location", "category"]:
        if k in payload and payload[k] != "":
            update[k] = payload[k]

    # 🔥 SPECIAL CASE: link
    if "link" in payload:
        if payload["link"].strip() == "":
            update["link"] = None  # ← clear link
        else:
            update["link"] = payload["link"]

    if image:
        update["imageFileId"] = fs.put(
            image.stream,
            filename=secure_filename(image.filename),
            content_type=image.mimetype,
        )

    update["updated_at"] = datetime.datetime.utcnow().isoformat()

    db.events.update_one(
        {"_id": ObjectId(event_id)},
        {"$set": update}
    )

    return jsonify(
        serialize_event(db.events.find_one({"_id": ObjectId(event_id)}))
    ), 200



# ---- DELETE EVENT ----
@app.route("/events/<event_id>", methods=["DELETE"])
@admin_required
def delete_event(event_id):
    doc = db.events.find_one({"_id": ObjectId(event_id)})
    if doc and doc.get("imageFileId"):
        fs.delete(doc["imageFileId"])
    db.events.delete_one({"_id": ObjectId(event_id)})
    return jsonify({"message": "Event deleted"}), 200






def serialize_member(doc):
    return {
        "id": str(doc["_id"]),
        "name": doc.get("name", ""),
        "role": doc.get("role", ""),
        "email": doc.get("email", ""),
        "class": doc.get("class", ""),
        "imageFileId": str(doc["imageFileId"]) if doc.get("imageFileId") else None,
        "imageUrl": f"/members/image/{doc['imageFileId']}" if doc.get("imageFileId") else None,
        "created_at": doc.get("created_at"),
        "updated_at": doc.get("updated_at"),
    }


@app.route("/members", methods=["GET"])
def list_members():
    docs = list(db.members.find({}).sort("name", 1))
    return jsonify([serialize_member(d) for d in docs]), 200


@app.route("/members/image/<file_id>", methods=["GET"])
def get_member_image(file_id):
    try:
        fid = ObjectId(file_id)
    except Exception:
        return jsonify({"error": "Invalid file id"}), 400

    grid_out = fs.get(fid)
    content_type = getattr(grid_out, "content_type", None) or "application/octet-stream"
    return Response(grid_out.read(), mimetype=content_type)


@app.route("/members", methods=["POST"])
@admin_required
def create_member():
    payload = request.form.to_dict()
    image = request.files.get("image")

    required = ["name", "role", "email", "class"]
    missing = [k for k in required if not payload.get(k)]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    image_file_id = None
    if image:
        image_file_id = fs.put(
            image.stream,
            filename=secure_filename(image.filename),
            content_type=image.mimetype,
            metadata={"type": "member_image"},
        )

    doc = {
        "name": payload["name"],
        "role": payload["role"],
        "email": payload["email"],
        "class": payload["class"],
        "imageFileId": image_file_id,
        "created_at": datetime.datetime.utcnow().isoformat(),
        "updated_at": datetime.datetime.utcnow().isoformat(),
    }

    res = db.members.insert_one(doc)
    saved = db.members.find_one({"_id": res.inserted_id})
    return jsonify(serialize_member(saved)), 201



@app.route("/members/<member_id>", methods=["PUT"])
@admin_required
def update_member(member_id):
    try:
        oid = ObjectId(member_id)
    except Exception:
        return jsonify({"error": "Invalid member id"}), 400

    existing = db.members.find_one({"_id": oid})
    if not existing:
        return jsonify({"error": "Member not found"}), 404

    payload = request.form.to_dict()
    image = request.files.get("image")

    update = {k: v for k, v in payload.items() if v}

    if image:
        old = existing.get("imageFileId")
        if old:
            try:
                fs.delete(old)
            except Exception:
                pass

        update["imageFileId"] = fs.put(
            image.stream,
            filename=secure_filename(image.filename),
            content_type=image.mimetype,
        )

    update["updated_at"] = datetime.datetime.utcnow().isoformat()

    db.members.update_one({"_id": oid}, {"$set": update})
    saved = db.members.find_one({"_id": oid})
    return jsonify(serialize_member(saved)), 200


@app.route("/members/<member_id>", methods=["DELETE"])
@admin_required
def delete_member(member_id):
    try:
        oid = ObjectId(member_id)
    except Exception:
        return jsonify({"error": "Invalid member id"}), 400

    existing = db.members.find_one({"_id": oid})
    if not existing:
        return jsonify({"error": "Member not found"}), 404

    fid = existing.get("imageFileId")
    if fid:
        try:
            fs.delete(fid)
        except Exception:
            pass

    db.members.delete_one({"_id": oid})
    return jsonify({"message": "Member deleted"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)