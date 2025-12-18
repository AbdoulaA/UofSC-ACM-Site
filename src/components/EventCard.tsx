import React from 'react';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { Event } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';

interface EventCardProps {
  event: Event;
}

const categoryColors: Record<Event['category'], string> = {
  workshop: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  meeting: 'bg-green-500/10 text-green-600 border-green-500/20',
  social: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  hackathon: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  speaker: 'bg-primary/10 text-primary border-primary/20',
};

const categoryLabels: Record<Event['category'], string> = {
  workshop: 'Workshop',
  meeting: 'Meeting',
  social: 'Social',
  hackathon: 'Hackathon',
  speaker: 'Speaker Event',
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="group hover-lift bg-card border-border overflow-hidden">
      <CardContent className="p-6">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[event.category]}`}>
            <Tag className="w-3 h-3" />
            {categoryLabels[event.category]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-display font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
