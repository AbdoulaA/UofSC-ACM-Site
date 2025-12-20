import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import EventCard from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/context/AdminContext';
import { Event } from '@/lib/types';

const Events: React.FC = () => {
  const { events } = useAdmin();
  const [activeFilter, setActiveFilter] = useState<Event['category'] | 'all'>('all');

  const categories: Array<{ value: Event['category'] | 'all'; label: string }> = [
    { value: 'all', label: 'All Events' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'meeting', label: 'Meetings' },
    { value: 'hackathon', label: 'Hackathons' },
    { value: 'speaker', label: 'Speakers' },
    { value: 'social', label: 'Socials' },
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.category === activeFilter);

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Upcoming Events
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            From hands-on workshops to networking socials, find events that help you 
            grow as a computing professional.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeFilter === category.value ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setActiveFilter(category.value)}
                className="flex-shrink-0"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No events found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Events;
