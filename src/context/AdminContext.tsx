import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Member, Event, mockMembers, mockEvents } from '@/lib/mockData';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  members: Member[];
  events: Event[];
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const addMember = (member: Omit<Member, 'id'>) => {
    const newMember: Member = {
      ...member,
      id: Date.now().toString(),
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const updateMember = (id: string, updatedData: Partial<Member>) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, ...updatedData } : member
      )
    );
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: string, updatedData: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...updatedData } : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        members,
        events,
        addMember,
        updateMember,
        deleteMember,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
