import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Calendar, Users, Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/context/AdminContext';
import { Event, Member } from '@/lib/mockData';

const Admin: React.FC = () => {
  const { toast } = useToast();
  const {
    isAdmin,
    members,
    events,
    addMember,
    updateMember,
    deleteMember,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useAdmin();

  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'workshop' as Event['category'],
  });

  // Member form state
  const [memberForm, setMemberForm] = useState({
    name: '',
    role: '',
    email: '',
    bio: '',
    linkedIn: '',
    github: '',
  });

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const resetEventForm = () => {
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'workshop',
    });
    setEditingEvent(null);
  };

  const resetMemberForm = () => {
    setMemberForm({
      name: '',
      role: '',
      email: '',
      bio: '',
      linkedIn: '',
      github: '',
    });
    setEditingMember(null);
  };

  const handleEditEvent = (event: Event) => {
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
    });
    setEditingEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setMemberForm({
      name: member.name,
      role: member.role,
      email: member.email,
      bio: member.bio || '',
      linkedIn: member.linkedIn || '',
      github: member.github || '',
    });
    setEditingMember(member);
    setIsMemberDialogOpen(true);
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, eventForm);
      toast({ title: "Event updated successfully" });
    } else {
      addEvent(eventForm);
      toast({ title: "Event created successfully" });
    }
    setIsEventDialogOpen(false);
    resetEventForm();
  };

  const handleSubmitMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMember(editingMember.id, memberForm);
      toast({ title: "Member updated successfully" });
    } else {
      addMember(memberForm);
      toast({ title: "Member added successfully" });
    }
    setIsMemberDialogOpen(false);
    resetMemberForm();
  };

  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
    toast({ title: "Event deleted", variant: "destructive" });
  };

  const handleDeleteMember = (id: string) => {
    deleteMember(id);
    toast({ title: "Member removed", variant: "destructive" });
  };

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage events, members, and content.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="events" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="events" className="gap-2">
                <Calendar className="w-4 h-4" />
                Events
              </TabsTrigger>
              <TabsTrigger value="members" className="gap-2">
                <Users className="w-4 h-4" />
                Members
              </TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-display font-semibold">Manage Events</h2>
                <Dialog open={isEventDialogOpen} onOpenChange={(open) => {
                  setIsEventDialogOpen(open);
                  if (!open) resetEventForm();
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>
                        {editingEvent ? 'Edit Event' : 'Add New Event'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitEvent} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={eventForm.title}
                          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={eventForm.description}
                          onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={eventForm.date}
                            onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            placeholder="6:00 PM"
                            value={eventForm.time}
                            onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={eventForm.location}
                          onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={eventForm.category}
                          onValueChange={(value) => setEventForm({ ...eventForm, category: value as Event['category'] })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="hackathon">Hackathon</SelectItem>
                            <SelectItem value="speaker">Speaker Event</SelectItem>
                            <SelectItem value="social">Social</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          <Save className="w-4 h-4 mr-2" />
                          {editingEvent ? 'Save Changes' : 'Create Event'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-card-foreground">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} at {event.time} • {event.location}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-display font-semibold">Manage Members</h2>
                <Dialog open={isMemberDialogOpen} onOpenChange={(open) => {
                  setIsMemberDialogOpen(open);
                  if (!open) resetMemberForm();
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>
                        {editingMember ? 'Edit Member' : 'Add New Member'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitMember} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={memberForm.name}
                          onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input
                            id="role"
                            placeholder="President, VP, etc."
                            value={memberForm.role}
                            onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={memberForm.email}
                            onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={memberForm.bio}
                          onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="linkedIn">LinkedIn URL</Label>
                          <Input
                            id="linkedIn"
                            value={memberForm.linkedIn}
                            onChange={(e) => setMemberForm({ ...memberForm, linkedIn: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub URL</Label>
                          <Input
                            id="github"
                            value={memberForm.github}
                            onChange={(e) => setMemberForm({ ...memberForm, github: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsMemberDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          <Save className="w-4 h-4 mr-2" />
                          {editingMember ? 'Save Changes' : 'Add Member'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {members.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-card-foreground">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {member.role} • {member.email}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditMember(member)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteMember(member.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Admin;
