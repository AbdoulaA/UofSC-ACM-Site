export interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  imageUrl?: string;
  bio?: string;
  linkedIn?: string;
  github?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  category: 'workshop' | 'meeting' | 'social' | 'hackathon' | 'speaker';
}

export const mockMembers: Member[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "President",
    email: "ajohnson@email.sc.edu",
    bio: "Senior CS major passionate about distributed systems and cloud computing.",
    linkedIn: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Vice President",
    email: "schen@email.sc.edu",
    bio: "Junior studying Computer Science with a focus on machine learning.",
    linkedIn: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "3",
    name: "Marcus Williams",
    role: "Treasurer",
    email: "mwilliams@email.sc.edu",
    bio: "Sophomore interested in fintech and blockchain development.",
    linkedIn: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    role: "Secretary",
    email: "erodriguez@email.sc.edu",
    bio: "Junior with interests in UX design and front-end development.",
    linkedIn: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "5",
    name: "David Kim",
    role: "Events Coordinator",
    email: "dkim@email.sc.edu",
    bio: "Senior passionate about community building and tech education.",
    linkedIn: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "6",
    name: "Jessica Taylor",
    role: "Workshop Lead",
    email: "jtaylor@email.sc.edu",
    bio: "Graduate student researching cybersecurity and network systems.",
    linkedIn: "https://linkedin.com",
    github: "https://github.com",
  },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript in this beginner-friendly workshop. Perfect for those just starting their coding journey!",
    date: "2024-02-15",
    time: "6:00 PM",
    location: "Swearingen Engineering Center, Room 2A15",
    category: "workshop",
  },
  {
    id: "2",
    title: "Weekly General Meeting",
    description: "Join us for our weekly meeting where we discuss upcoming events, share opportunities, and network with fellow members.",
    date: "2024-02-20",
    time: "5:30 PM",
    location: "Storey Innovation Center",
    category: "meeting",
  },
  {
    id: "3",
    title: "GameCock Hackathon 2024",
    description: "48-hour hackathon bringing together students from across the Southeast. Build innovative solutions, win prizes, and make connections!",
    date: "2024-03-01",
    time: "6:00 PM",
    location: "Carolina Coliseum",
    category: "hackathon",
  },
  {
    id: "4",
    title: "Industry Speaker: Google Engineer",
    description: "Hear from a Google software engineer about life at a big tech company, career advice, and the latest in cloud computing.",
    date: "2024-02-28",
    time: "7:00 PM",
    location: "Swearingen Engineering Center, Room 1A10",
    category: "speaker",
  },
  {
    id: "5",
    title: "Game Night & Social",
    description: "Take a break from coding! Join us for board games, video games, pizza, and great company.",
    date: "2024-02-22",
    time: "7:00 PM",
    location: "Russell House Ballroom",
    category: "social",
  },
];
