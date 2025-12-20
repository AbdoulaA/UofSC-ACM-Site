import React from 'react';
import { ArrowRight, Code, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-14">
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-fade-up text-primary-foreground" style={{ animationDelay: '0.1s' }}>
            Association for
            <br />
            <span className="text-gradient-garnet-light">Computing Machinery</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
We're the ACM Chapter at the University of South Carolina.

          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/events">
              <Button variant="hero" size="xl">
                Explore Events
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="heroOutline" size="xl">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto animate-fade-up mb-36" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/20">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold text-primary-foreground">200+</div>
              <div className="text-sm text-primary-foreground/60">Active Members</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/20">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold text-primary-foreground">50+</div>
              <div className="text-sm text-primary-foreground/60">Events/Year</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/20">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold text-primary-foreground">15+</div>
              <div className="text-sm text-primary-foreground/60">Workshops</div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="mt-14 absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
