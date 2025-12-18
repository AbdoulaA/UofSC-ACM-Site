import React from 'react';
import { Github, Linkedin, Mail, User } from 'lucide-react';
import { Member } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <Card className="group hover-lift bg-card border-border overflow-hidden">
      <CardContent className="p-6">
        {/* Avatar */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-garnet flex items-center justify-center shadow-garnet group-hover:scale-105 transition-transform">
          {member.imageUrl ? (
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-primary-foreground" />
          )}
        </div>

        {/* Name & Role */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-display font-bold text-card-foreground group-hover:text-primary transition-colors">
            {member.name}
          </h3>
          <p className="text-sm text-primary font-medium">{member.role}</p>
        </div>

        {/* Bio */}
        {member.bio && (
          <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
            {member.bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
