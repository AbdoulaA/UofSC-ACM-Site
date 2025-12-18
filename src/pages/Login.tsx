import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/context/AdminContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsAdmin } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated login - replace with actual authentication when database is integrated
    // For demo purposes, any email/password combination works
    setTimeout(() => {
      setIsLoading(false);
      
      if (email && password) {
        setIsAdmin(true);
        toast({
          title: "Welcome back!",
          description: "You've been logged in as an admin.",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Error",
          description: "Please enter your email and password.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <main className="pt-20 min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <Card className="w-full max-w-md animate-fade-up">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-garnet flex items-center justify-center shadow-garnet">
            <Terminal className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-display">Admin Login</CardTitle>
          <CardDescription>
            Sign in to manage events, members, and content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@email.sc.edu"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            For demo purposes, any credentials will work.
            <br />
            Replace with real authentication when ready.
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
