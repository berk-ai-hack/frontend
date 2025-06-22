import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Users,
  FileText,
  Award,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8" style={{ color: "#0077fe" }} />
              <span
                className="ml-2 text-xl font-bold"
                style={{ color: "#0077fe" }}
              >
                Teacher's Pet
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Features
              </span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                How It Works
              </span>
              <span className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Contact
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

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <div className="flex space-x-4 mb-8">
              <span
                className="px-4 py-2 rounded-full text-sm"
                style={{ backgroundColor: "#FDB515", color: "white" }}
              >
                Built for Educators
              </span>
              <span className="px-4 py-2 rounded-full text-sm flex items-center border border-gray-300">
                Powered by Claude
                <img
                  src="https://images.seeklogo.com/logo-png/55/1/claude-logo-png_seeklogo-554534.png"
                  alt="Claude logo"
                  className="ml-2 w-4 h-4"
                />
              </span>
            </div>

            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Your AI
              <br />
              <span style={{ color: "#0077fe" }}>Grading Assistant</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Teacher's Pet gives you a real-time pulse on your students. No
              bullsh*t meetings. No manual updates.
            </p>

            <div className="mb-8">
              <Button
                onClick={() => navigate("/login")}
                className="px-8 py-3 rounded-lg font-medium flex items-center"
                style={{ backgroundColor: "#FDB515", color: "white" }}
              >
                Get Started <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              FERPA Compliant | Zero Data Retention
            </p>
          </div>

          {/* Right side - Dashboard mockup */}
          <div className="relative">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold" style={{ color: "#0077fe" }}>
                    Grading Dashboard
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-gray-100 rounded p-3 mb-3">
                  <div className="text-gray-600 text-sm">
                    🔍 Ask about anything...
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">
                      Linear Algebra
                    </span>
                    <span className="text-green-600 text-sm">● Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">
                      Comp Literature
                    </span>
                    <span className="text-yellow-600 text-sm">● Pending</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">
                      Reading & Comp
                    </span>
                    <span style={{ color: "#0077fe" }} className="text-sm">
                      ● In Progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-12 mt-32">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#FDB515" }}
            >
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#0077fe" }}
            >
              Sync with Canvas
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Import classes and assignments automatically from your learning
              management system
            </p>
          </div>

          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#0077fe" }}
            >
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#0077fe" }}
            >
              AI Feedback
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Generate intelligent grading suggestions and detailed feedback for
              student submissions
            </p>
          </div>

          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#FDB515" }}
            >
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#0077fe" }}
            >
              Voice Recording
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Add personalized audio feedback to create more meaningful
              connections with students
            </p>
          </div>
        </div>

        {/* Integrations Section */}
        <div className="mt-24 text-center">
          <p className="text-gray-500 text-sm mb-8">Integrates with</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {/* D2L Brightspace */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">D2L</span>
              </div>
              <span className="text-gray-600 text-sm">Brightspace</span>
            </div>

            {/* Canvas */}
            <div className="flex items-center">
              <img
                src="https://www.instructure.com/sites/default/files/image/2021-12/Canvas_logo_single_mark.png"
                alt="Canvas Logo"
                className="w-8 h-8 mr-2"
              />
              <span className="text-gray-600 text-sm">Canvas</span>
            </div>

            {/* Google Classroom */}
            <div className="flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png"
                alt="Google Classroom Logo"
                className="w-8 h-8 mr-2"
              />
              <span className="text-gray-600 text-sm">Google Classroom</span>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm mb-6">Trusted by teachers at</p>
          <div className="flex justify-center items-center">
            <img
              src="https://logos-world.net/wp-content/uploads/2022/02/UC-Berkeley-Symbol.png"
              alt="UC Berkeley Logo"
              className="h-10 opacity-70"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
