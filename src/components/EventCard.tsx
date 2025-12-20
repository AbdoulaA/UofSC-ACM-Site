import React from "react";
import { Calendar, MapPin, Clock, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

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

interface Props {
  event: Event;
}

const EventCard: React.FC<Props> = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`} className="block">

    <Card className="overflow-hidden hover-lift cursor-pointer">
      {/* Image */}
      {event.imageUrl && (
        <img
          src={`${API_URL}${event.imageUrl}`}
          alt={event.title}
          className="w-full h-48 object-cover border-b"
          loading="lazy"
        />
      )}

      <CardContent className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-display font-bold text-foreground">
          {event.title}
        </h3>

        {/* Meta */}
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span className="capitalize">{event.category}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {event.description}
        </p>

        <a href={event.link ?? "#"} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline">
          {event.link}
        </a>
      </CardContent>
    </Card>
    </Link>

  );
};

export default EventCard;
