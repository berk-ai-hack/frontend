import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const navigate = useNavigate();

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
              <div className="flex items-center space-x-8">
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
                  className="text-gray-600 hover:text-gray-900 cursor-pointer font-semibold"
                  style={{ color: "#0077fe" }}
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
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1
              className="text-5xl font-bold mb-6"
              style={{ color: "#0077fe" }}
            >
              About Teacher's Pet
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're students who've dealt with both the pain of grading, and
              being graded. <br></br>We're here to make it easier from here on
              out, cheers!
            </p>
          </div>

          {/* Team Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {/* Lavanya Sharma */}
            <div className="text-center">
              <img
                src="/lavanya.jpg"
                alt="Lavanya Sharma"
                className="w-32 h-32 rounded-xl object-cover mx-auto mb-6"
              />
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0077fe" }}
              >
                Lavanya Sharma
              </h3>
              <p className="text-gray-500">AM + Physics @ Berkeley</p>
            </div>

            {/* Harsh Dadhich */}
            <div className="text-center">
              <img
                src="/harsh.jpg"
                alt="Harsh Dadhich"
                className="w-32 h-32 rounded-xl object-cover mx-auto mb-6"
              />
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0077fe" }}
              >
                Harsh Dadhich
              </h3>
              <p className="text-gray-500">MEng @ UCLA</p>
            </div>

            {/* Vighanesh Sharma */}
            <div className="text-center">
              <img
                src="/vig.jpg"
                alt="Vighanesh Sharma"
                className="w-32 h-32 rounded-xl object-cover mx-auto mb-6"
              />
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0077fe" }}
              >
                Vighanesh Sharma
              </h3>
              <p className="text-gray-500">MSCS @ UT Dallas</p>
            </div>

            {/* Nikhil Hooda */}
            <div className="text-center">
              <img
                src="/nik.jpg"
                alt="Nikhil Hooda"
                className="w-32 h-32 rounded-xl object-cover mx-auto mb-6"
              />
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0077fe" }}
              >
                Nikhil Hooda
              </h3>
              <p className="text-gray-500">CS @ UWaterloo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
