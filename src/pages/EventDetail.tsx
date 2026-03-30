import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Tag, ArrowLeft, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl?: string | null;
  link?: string | null;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/events/${id}`)
      .then(res => res.json())
      .then(setEvent)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8">Loading event…</p>;
  if (!event) return <p className="p-8">Event not found.</p>;

  return (
    <main className="pt-24 container mx-auto px-4 max-w-3xl">
      <Link to="/events" className="inline-flex items-center gap-2 text-muted-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to events
      </Link>

      <Card className="overflow-hidden">
        {event.imageUrl && (
          <img
            src={`${API_URL}${event.imageUrl}`}
            className="w-full h-72 object-cover"
          />
        )}

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-display font-bold">{event.title}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(event.date + "T00:00:00").toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {event.location}
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span className="capitalize">{event.category}</span>
            </div>
          </div>

          <p className="text-hero-foreground leading-relaxed">
            {event.description}
          </p>

          {event.link && (
            <Button asChild className="mt-4">
              <a href={event.link} target="_blank" rel="noopener noreferrer">
                View Event Link <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          )}
        </div>
      </Card>
    </main>
  );
};

export default EventDetail;
