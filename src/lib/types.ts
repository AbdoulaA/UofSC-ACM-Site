export interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  class: string;
  imageUrl?: string | null;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: "workshop" | "meeting" | "social" | "hackathon" | "speaker";
  imageUrl?: string | null;
  link?: string | null;
}

