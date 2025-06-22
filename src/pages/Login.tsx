import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Theme colors for cycling
  const themeColors = [
    "#FDB515", // California Gold
    "#0077fe", // Blue
    "#FF003A", // Canvas Red
    "#E17110", // Brightspace Orange
  ];

  // Cycle through colors every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % themeColors.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login authentication
    setTimeout(() => {
      setIsLoading(false);
      login(); // Set logged in state
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to sync page...",
      });
      navigate("/sync");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      {/* Backdrop Background */}
      <div className="fixed inset-0 z-0 opacity-5">
        <img
          src="/backdrop.svg"
          alt="Background"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <Navigation />

        {/* Main Content */}
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <Card className="shadow-xl border border-gray-200 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: "#0077fe" }}
              >
                Educator Login
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Sign in to access your grading dashboard
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Berkeley Preselection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">
                    Institution
                  </Label>
                  <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <img
                      src="https://logos-world.net/wp-content/uploads/2022/02/UC-Berkeley-Symbol.png"
                      alt="UC Berkeley Logo"
                      className="w-12 h-8 mr-3 object-contain"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        UC Berkeley
                      </div>
                      <div className="text-sm text-gray-600">
                        Preselected for you
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your Berkeley email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 text-lg font-medium mt-6 transition-all duration-500 transform hover:scale-105 relative overflow-hidden backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-blue-500/25"
                  style={{
                    backgroundColor: isLoading ? "#FDB515" : "#FDB515",
                    color: "white",
                    backgroundImage:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                    boxShadow:
                      "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = "#0077fe";
                      e.currentTarget.style.boxShadow =
                        "0 8px 32px 0 rgba(0, 119, 254, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = "#FDB515";
                      e.currentTarget.style.boxShadow =
                        "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
                    }
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Secure login powered by UC Berkeley authentication
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
