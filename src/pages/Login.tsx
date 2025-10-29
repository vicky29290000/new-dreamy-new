import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/utils/toast";

const roles = ["super-admin", "admin", "architect", "structural", "team", "customer"];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // default
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({ title: "Email and password are required.", type: "error" });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast({ title: error.message, type: "error" });
    } else {
      // Optional: You can validate role from your Supabase 'profiles' table
      toast({ title: "Login successful!", type: "success" });

      // Redirect based on role
      switch(role) {
        case "super-admin":
          navigate("/super-admin-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "architect":
          navigate("/architect-dashboard");
          break;
        case "structural":
          navigate("/structural-dashboard");
          break;
        case "team":
          navigate("/team-dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Label>Role</Label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r.replace("-", " ")}</option>
              ))}
            </select>
          </div>
          <Button
            onClick={handleLogin}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
