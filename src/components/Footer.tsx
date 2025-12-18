import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-garnet rounded-lg flex items-center justify-center shadow-garnet">
                <Terminal className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight text-card-foreground">
                  ACM at UofSC
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm mb-4">
              The University of South Carolina chapter of the Association for Computing Machinery. 
              Building the future of computing, one student at a time.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:acm@cse.sc.edu"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-card-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/members" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Members
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="https://www.acm.org/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  ACM International
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-card-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Department of Computer Science</li>
              <li>University of South Carolina</li>
              <li>Columbia, SC 29208</li>
              <li className="pt-2">
                <a href="mailto:acm@cse.sc.edu" className="hover:text-primary transition-colors">
                  acm@cse.sc.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ACM at University of South Carolina. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
