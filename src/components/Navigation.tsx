import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  currentPage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
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
          <div className="flex items-center space-x-8">
            {!isLoggedIn ? (
              // Public navigation
              <>
                <span
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Home
                </span>
                <span
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={() => {
                    document
                      .getElementById("features-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  Features
                </span>
                <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                  How It Works
                </span>
                <span
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={() => navigate("/about")}
                >
                  About Us
                </span>
                <Button
                  className="px-6 py-2 rounded-lg font-medium"
                  style={{ backgroundColor: "#FDB515", color: "white" }}
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              </>
            ) : (
              // Logged in navigation
              <>
                <span
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </span>
                <span
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={() => navigate("/about")}
                >
                  About Us
                </span>
                <span
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={handleLogout}
                >
                  Sign Out
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
