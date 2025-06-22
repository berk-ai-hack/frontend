import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

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
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img
                  src="/tpdog.svg"
                  alt="Teacher's Pet Dog"
                  className="h-8 w-auto mr-2"
                />
                <img
                  src="/teacher_s pet logo.svg"
                  alt="Teacher's Pet Logo"
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1
              className="text-6xl font-bold mb-4"
              style={{ color: "#0077fe" }}
            >
              404
            </h1>
            <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
            <Button
              onClick={() => navigate("/")}
              className="text-white"
              style={{ backgroundColor: "#FDB515" }}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
