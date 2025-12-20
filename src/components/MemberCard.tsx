import React from "react";
import { Member } from "@/lib/types";
import { useAdmin } from "@/context/AdminContext";

const API_URL = import.meta.env.VITE_API_URL;

interface Props {
  member: Member;
}

const MemberCard: React.FC<Props> = ({ member }) => {
  return (
    <div className="rounded-2xl bg-card border border-border p-6 text-center">
      {member.imageUrl ? (
        <img
          src={`${API_URL}${member.imageUrl}`}
          alt={member.name}
          className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border"
        />
      ) : (
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          No Image
        </div>
      )}

      <h3 className="text-lg font-display font-bold">
        {member.name}
      </h3>

<h2 className="text-md text-muted-foreground">
  Class of {member.class}
</h2>
      <p className="text-sm text-muted-foreground">
        {member.role}
      </p>
    </div>
  );
};

export default MemberCard;
