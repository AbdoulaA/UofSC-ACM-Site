import React from 'react';
import MemberCard from '@/components/MemberCard';
import { useAdmin } from '@/context/AdminContext';

const Members: React.FC = () => {
  const { members } = useAdmin();

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Our Team
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Meet the dedicated officers and members who make ACM at UofSC thrive.
          </p>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
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

export default Members;
