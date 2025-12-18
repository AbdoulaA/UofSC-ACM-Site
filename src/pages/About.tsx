import React from 'react';
import { Code, Users, Calendar, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About: React.FC = () => {
  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            About ACM at UofSC
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            The University of South Carolina's chapter of the Association for Computing Machinery, 
            the world's largest computing society.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-center">
              We strive to foster a vibrant community of computing enthusiasts at the University 
              of South Carolina. Through workshops, networking events, hackathons, and industry 
              connections, we prepare students for successful careers in technology while building 
              lasting friendships along the way.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground mb-12 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover-lift">
              <div className="w-12 h-12 rounded-xl bg-gradient-garnet flex items-center justify-center flex-shrink-0 shadow-garnet">
                <Code className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-card-foreground mb-2">Technical Workshops</h3>
                <p className="text-muted-foreground text-sm">
                  Hands-on sessions covering web development, algorithms, machine learning, 
                  and more. Perfect for all skill levels.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover-lift">
              <div className="w-12 h-12 rounded-xl bg-gradient-garnet flex items-center justify-center flex-shrink-0 shadow-garnet">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-card-foreground mb-2">Networking Events</h3>
                <p className="text-muted-foreground text-sm">
                  Connect with industry professionals, alumni, and recruiters from 
                  leading tech companies.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover-lift">
              <div className="w-12 h-12 rounded-xl bg-gradient-garnet flex items-center justify-center flex-shrink-0 shadow-garnet">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-card-foreground mb-2">Competitions</h3>
                <p className="text-muted-foreground text-sm">
                  Participate in hackathons, coding challenges, and programming 
                  competitions throughout the year.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover-lift">
              <div className="w-12 h-12 rounded-xl bg-gradient-garnet flex items-center justify-center flex-shrink-0 shadow-garnet">
                <Calendar className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-card-foreground mb-2">Regular Meetups</h3>
                <p className="text-muted-foreground text-sm">
                  Weekly meetings, study sessions, and social events to keep our 
                  community connected and engaged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Join Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            ACM membership is open to all UofSC students interested in computing, regardless 
            of major or experience level. Join us at our next meeting to get started!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.acm.org/membership/join" target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="lg">
                Join ACM International
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
            <a href="mailto:acm@cse.sc.edu">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* About ACM International */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">
              About ACM International
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Association for Computing Machinery (ACM) is the world's largest educational 
              and scientific computing society, uniting computing educators, researchers, and 
              professionals to inspire dialogue, share resources, and address the field's challenges. 
              ACM strengthens the computing profession's collective voice through strong leadership, 
              promotion of the highest standards, and recognition of technical excellence.
            </p>
            <a href="https://www.acm.org/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">
                Learn More About ACM
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
