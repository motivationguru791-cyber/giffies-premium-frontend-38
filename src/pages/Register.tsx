import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.register({ name, email, password });
      login(res.token, res.user);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground text-sm">Join GIFFIES and start gifting</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-destructive text-sm text-center bg-destructive/10 rounded-md p-3">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-md border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-premium"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-md border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-premium"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-md border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-premium"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium text-sm uppercase tracking-wider hover:bg-primary/90 transition-premium disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
