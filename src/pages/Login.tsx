import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Terminal } from "lucide-react";
import { jwtDecode } from "jwt-decode";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/context/AdminContext";

const API_URL = import.meta.env.VITE_API_URL;

type JwtPayload = {
  role?: string;
  exp?: number;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsAdmin } = useAdmin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- Check if already logged in ---------------- */

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      // Check expiration
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("access_token");
        return;
      }

      // Redirect based on role
      if (decoded.role === "admin" || decoded.role === "super") {
        setIsAdmin(true);
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch {
      localStorage.removeItem("access_token");
    }
  }, [navigate, setIsAdmin]);

  /* ---------------- Login submit ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school_email: email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("access_token", data.access_token);

      if (data.user.role === "admin" || data.user.role === "super") {
        setIsAdmin(true);
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast({
        title: "Welcome back!",
        description: `Logged in as ${data.user.first_name}`,
      });
    } catch (err: any) {
      toast({
        title: "Login error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <main className="pt-20 min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <Card className="w-full max-w-md animate-fade-up">
        <CardHeader className="text-center">
          <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center">
            <img src="./public/acmlogo-grad.png" alt="ACM Logo" />
          </div>
          <CardTitle className="text-2xl font-display">
            Login
          </CardTitle>
          <CardDescription>
            Sign in with your university email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">School Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Not a member yet?{" "}
            <Link to="/register" className="text-primary underline">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
