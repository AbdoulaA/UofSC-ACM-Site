import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { Member, Event } from "@/lib/types"; // <-- no mock import

const API_URL = import.meta.env.VITE_API_URL;

/* ---------------- Types ---------------- */

interface JwtPayload {
  role?: string;
  exp?: number;
}

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  logout: () => void;

  members: Member[];
  events: Event[];

  refreshMembers: () => Promise<void>;
  refreshEvents: () => Promise<void>;
}

/* ---------------- Context ---------------- */

const AdminContext = createContext<AdminContextType | undefined>(undefined);

/* ---------------- Provider ---------------- */

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  /* ---------------- Detect Role from JWT ---------------- */

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setIsAdmin(decoded.role === "admin" || decoded.role === "super");
    } catch {
      localStorage.removeItem("access_token");
      setIsAdmin(false);
    }
  }, []);

  /* ---------------- Fetch API Data ---------------- */

  const refreshEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/events`);
      if (res.ok) {
        setEvents(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const refreshMembers = async () => {
    try {
      const res = await fetch(`${API_URL}/members`);
      if (res.ok) {
        setMembers(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch members", err);
    }
  };

  /* ---------------- Initial Load ---------------- */

  useEffect(() => {
    refreshEvents();
    refreshMembers();
  }, []);

  /* ---------------- Logout ---------------- */

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAdmin(false);
    setMembers([]);
    setEvents([]);
  };

  /* ---------------- Provider ---------------- */

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        logout,
        members,
        events,
        refreshMembers,
        refreshEvents,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

/* ---------------- Hook ---------------- */

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
