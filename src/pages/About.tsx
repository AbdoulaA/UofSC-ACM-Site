import React from "react";
import { Code, Users, Calendar, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { FaDiscord } from "react-icons/fa";



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
            The University of South Carolina's chapter of the Association for
            Computing Machinery, the world's largest computing society.
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
              We are the UofSC Association for Computing Machinery (ACM), the
              largest Computer Science organization on campus. Our mission is to
              deepen members' understanding of Computer Science, facilitate
              employer networking, and connect students with internships,
              research, and job opportunities, all while fostering a supportive
              and fun community.
            </p>
          </div>
        </div>
      </section>

{/* ACM Wiki Section */}
<section className="py-16 bg-muted/30">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-display font-bold text-foreground mb-6">
        ACM Wiki
      </h2>

      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
        We’re building a community-driven knowledge base for UofSC students
        interested in computing. Stay tuned!
      </p>

      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-card border border-border shadow-sm">
        <Calendar className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Coming Soon — Spring 2026
        </span>
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
            ACM membership is open to all UofSC students interested in
            computing, regardless of major or experience level. Stay tuned
            through our Instagram or Discord!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/XANbqEmR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="xl" className="gap-2">
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

      {/* About ACM International */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">
              About ACM International
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ACM brings together computing educators, researchers, and
              professionals to inspire dialogue, share resources, and address
              the field's challenges. As the world’s largest computing society,
              ACM strengthens the profession's collective voice through strong
              leadership, promotion of the highest standards, and recognition of
              technical excellence. ACM supports the professional growth of its
              members by providing opportunities for life‐long learning, career
              development, and professional networking.
            </p>
            <a
              href="https://www.acm.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
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
