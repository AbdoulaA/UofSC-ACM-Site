import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Plus,
  Pencil,
  Trash2,
  Save,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/context/AdminContext";

const API_URL = import.meta.env.VITE_API_URL;

/* ================= TYPES ================= */

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: "workshop" | "meeting" | "social" | "hackathon" | "speaker";
  imageUrl?: string | null;
  link?: string | null;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  class: string;
  imageUrl?: string | null;
}

/* ================= COMPONENT ================= */

const Admin: React.FC = () => {
  const { isAdmin } = useAdmin();
  const { toast } = useToast();
  const token = localStorage.getItem("access_token");

  if (!isAdmin) return <Navigate to="/login" replace />;

  /* ---------- STATE ---------- */

  const [events, setEvents] = useState<Event[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const [eventImage, setEventImage] = useState<File | null>(null);
  const [memberImage, setMemberImage] = useState<File | null>(null);

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "workshop" as Event["category"],
    link: "",
  });

  const [memberForm, setMemberForm] = useState({
    name: "",
    role: "",
    email: "",
    class: "",
  });

  /* ---------- FETCH ---------- */

  useEffect(() => {
    fetchEvents();
    fetchMembers();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch(`${API_URL}/events`);
    setEvents(await res.json());
  };

  const fetchMembers = async () => {
    const res = await fetch(`${API_URL}/members`);
    setMembers(await res.json());
  };

  /* ---------- EVENT CRUD ---------- */

  const resetEventForm = () => {
    setEditingEvent(null);
    setEventImage(null);
    setEventForm({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "workshop",
      link: "",
    });
  };

  const submitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const form = new FormData();
    Object.entries(eventForm).forEach(([k, v]) => {
      if (v) form.append(k, v);
    });
    if (eventImage) form.append("image", eventImage);

    const url = editingEvent
      ? `${API_URL}/events/${editingEvent.id}`
      : `${API_URL}/events`;

    await fetch(url, {
      method: editingEvent ? "PUT" : "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    toast({ title: editingEvent ? "Event updated" : "Event created" });
    setEventDialogOpen(false);
    resetEventForm();
    fetchEvents();
  };

  const deleteEvent = async (id: string) => {
    if (!token) return;
    await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    toast({ title: "Event deleted", variant: "destructive" });
    fetchEvents();
  };

  /* ---------- MEMBER CRUD ---------- */

  const resetMemberForm = () => {
    setEditingMember(null);
    setMemberImage(null);
    setMemberForm({ name: "", role: "", email: "", class: "" });
  };

  const submitMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const form = new FormData();
    Object.entries(memberForm).forEach(([k, v]) => form.append(k, v));
    if (memberImage) form.append("image", memberImage);

    const url = editingMember
      ? `${API_URL}/members/${editingMember.id}`
      : `${API_URL}/members`;

    await fetch(url, {
      method: editingMember ? "PUT" : "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    toast({ title: editingMember ? "Member updated" : "Member added" });
    setMemberDialogOpen(false);
    resetMemberForm();
    fetchMembers();
  };

  const deleteMember = async (id: string) => {
    if (!token) return;
    await fetch(`${API_URL}/members/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    toast({ title: "Member removed", variant: "destructive" });
    fetchMembers();
  };

  /* ================= UI ================= */

  return (
    <main className="pt-20 min-h-screen bg-background">
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage ACM events and members
          </p>
        </div>
      </section>

      <section className="py-8 container mx-auto px-4">
        <Tabs defaultValue="events">
          <TabsList className="grid grid-cols-2 max-w-md">
            <TabsTrigger value="events">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="w-4 h-4 mr-2" />
              Members
            </TabsTrigger>
          </TabsList>

          {/* ================= EVENTS ================= */}
          <TabsContent value="events" className="space-y-4">
            <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetEventForm}>
                  <Plus className="w-4 h-4 mr-2" /> Add Event
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingEvent ? "Edit Event" : "Add Event"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={submitEvent} className="space-y-3">
                  <Input placeholder="Title" value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} />
                  <Textarea placeholder="Description" value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} />
                  <Input type="date" value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
                  <Input placeholder="Time" value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })} />
                  <Input placeholder="Location" value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />

                  <Select value={eventForm.category}
                    onValueChange={(v) => setEventForm({ ...eventForm, category: v as Event["category"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="speaker">Speaker</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input type="file" accept="image/*"
                    onChange={(e) => setEventImage(e.target.files?.[0] || null)} />

                  <Input placeholder="Event Link (optional)" value={eventForm.link}
                    onChange={(e) => setEventForm({ ...eventForm, link: e.target.value })} />

                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" /> Save
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {events.map((e) => (
              <Card key={e.id}>
                <CardContent className="flex gap-4 p-4">
                  {e.imageUrl && (
                    <img src={`${API_URL}${e.imageUrl}`}
                      className="h-40 rounded-md object-cover" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{e.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {e.date} • {e.time} • {e.category}
                    </p>
                    <p className="text-sm">{e.description}</p>

                    {e.link && (
                      <a href={e.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary mt-1">
                        Event Link <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <Button size="icon" variant="ghost"
                    onClick={() => {
                      setEditingEvent(e);
                      setEventForm({
                        title: e.title,
                        description: e.description,
                        date: e.date,
                        time: e.time,
                        location: e.location,
                        category: e.category,
                        link: e.link || "",
                      });
                      setEventDialogOpen(true);
                    }}>
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button size="icon" variant="ghost"
                    onClick={() => deleteEvent(e.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ================= MEMBERS ================= */}
          <TabsContent value="members" className="space-y-4">
            <Dialog open={memberDialogOpen} onOpenChange={setMemberDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetMemberForm}>
                  <Plus className="w-4 h-4 mr-2" /> Add Member
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingMember ? "Edit Member" : "Add Member"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={submitMember} className="space-y-3">
                  <Input
                    placeholder="Name"
                    value={memberForm.name}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Role"
                    value={memberForm.role}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, role: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Class Year"
                    value={memberForm.class}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, class: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Email"
                    value={memberForm.email}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, email: e.target.value })
                    }
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setMemberImage(e.target.files?.[0] || null)
                    }
                  />
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" /> Save
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {members.map((m) => (
              <Card key={m.id}>
                <CardContent className="flex gap-4 items-center p-4">
                  {m.imageUrl && (
                    <img
                      src={`${API_URL}${m.imageUrl}`}
                      className="w-24 h-24 rounded-md object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {m.role} • {m.class}
                    </p>
                    <p className="text-sm">{m.email}</p>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setEditingMember(m);
                      setMemberForm({
                        name: m.name,
                        role: m.role,
                        email: m.email,
                        class: m.class,
                      });
                      setMemberDialogOpen(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteMember(m.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Admin;
