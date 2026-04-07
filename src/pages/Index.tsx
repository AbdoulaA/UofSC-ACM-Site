import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Trophy,
  User,
} from "lucide-react";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import MemberCard from "@/components/MemberCard";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { Instagram } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

const reasons = [
  {
    Icon: BookOpen,
    title: "Learn stuff your classes skip",
    description:
      "We run workshops on things like system design, interview prep, and tools you'll actually use on the job, not just what's on the exam.",
  },
  {
    Icon: Trophy,
    title: "Get your foot in the door",
    description:
      "We bring in recruiters and engineers for info sessions and networking nights. The internship you want is a conversation away.",
  },
  {
    Icon: User,
    title: "Find your people",
    description:
      "Whether you've been coding since middle school or just declared CS last semester, you'll fit right in. No gatekeeping, just good people.",
  },
];

const DISPLAY_MS = 10000;

const Index: React.FC = () => {
  const { events, members } = useAdmin();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % reasons.length);
    }, DISPLAY_MS);
    return () => clearInterval(id);
  }, []);

  // Show only first 3 events and first 4 members on homepage
  const featuredEvents = events.slice(0, 3);
  const featuredMembers = members;

  const { Icon, title, description } = reasons[currentIndex];

  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Join ACM?
            </h2>
            {/* <p className="text-muted-foreground max-w-2xl mx-auto">
              We're more than just a club, we're a community of passionate technologists 
              building the future together.
            </p> */}
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-2xl overflow-hidden">
              <div className="p-8 rounded-2xl bg-card border border-border">
                <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-garnet flex items-center justify-center shadow-garnet">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-bold text-card-foreground mb-3">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {reasons.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i === currentIndex ? "bg-foreground" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
            Ready to Join?
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            Become a part of the largest computing community at the University
            of South Carolina. No experience required!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/9mVHn87jpr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="heroOutline" size="xl" className="gap-2">
                <FaDiscord className="" />
                Join Our Discord
              </Button>
            </a>

            <a
              href="https://www.instagram.com/uofscacm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="hero" size="xl" className="gap-2">
                <Instagram className="w-14 h-14 shrink-0" />
                Follow on Instagram
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground max-w-xl">
                From workshops to hackathons, there's always something happening
                at ACM.
              </p>
            </div>
            <Link to="/events" className="mt-6 md:mt-0">
              <Button variant="outline">
                View All Events
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Our Leadership
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Meet the dedicated team working to make ACM at UofSC the best it
                can be.
              </p>
            </div>
            {/* <Link to="/members" className="mt-6 md:mt-0">
              <Button variant="outline">
                Meet the Team
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMembers.map((member, index) => (
              <div
                key={member.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Index;
