import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Trophy,
  Book,
  User,
} from "lucide-react";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import MemberCard from "@/components/MemberCard";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { Instagram } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

const Index: React.FC = () => {
  const { events, members } = useAdmin();

  // Show only first 3 events and first 4 members on homepage
  const featuredEvents = events.slice(0, 3);
  const featuredMembers = members;

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card border border-border">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-garnet flex items-center justify-center shadow-garnet">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold text-card-foreground mb-3">
                Enhance your coding skills
              </h3>
              {/* <p className="text-muted-foreground text-sm">
                Access workshops, study groups, and hands-on projects that 
                complement your coursework and build real-world skills.
              </p> */}
            </div>

            <div className="text-center p-8 rounded-2xl bg-card border border-border">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-garnet flex items-center justify-center shadow-garnet">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold text-card-foreground mb-3">
                Connect with employers
              </h3>
              {/* <p className="text-muted-foreground text-sm">
                Meet fellow students, industry professionals, and recruiters 
                from top tech companies at our events and meetups.
              </p> */}
            </div>

            <div className="text-center p-8 rounded-2xl bg-card border border-border">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-garnet flex items-center justify-center shadow-garnet">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold text-card-foreground mb-3">
                Find a community you belong in
              </h3>
              {/* <p className="text-muted-foreground text-sm">
                Participate in hackathons, coding competitions, and build 
                projects that stand out on your resume.
              </p> */}
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
              href="https://discord.gg/XANbqEmR"
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
