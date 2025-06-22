import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Mic,
  FileText,
  Users,
  Award,
  Settings,
  GitBranchPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      {/* Backdrop Background */}
      <div className="fixed inset-0 z-0 opacity-5">
        <img
          src="/backdrop.svg"
          alt="Background"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Header */}
      <Navigation />

      {/* Content */}
      <div className="relative z-10">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span style={{ color: "#FDB515" }}>How It</span>
              <span style={{ color: "#0077fe" }}> Works</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our infrastructure is designed to be a seamless extension of your
              teaching workflow, not a replacement for it.
            </p>
          </div>

          {/* Architecture Diagram - Desktop */}
          <div className="hidden lg:block relative my-24 h-[600px]">
            {/* Platforms */}
            <div
              id="platform-canvas"
              className="platform absolute top-0 left-0 w-80 h-48"
            >
              <div className="platform-content">
                <div className="flex items-center mb-3">
                  <img
                    src="/canvas-logo.svg"
                    alt="Canvas"
                    className="w-10 h-10 mr-3"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">Canvas</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Multiple input streams are synced from your LMS.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="chip">
                    <Users className="w-3 h-3 mr-1.5" />
                    Students
                  </div>
                  <div className="chip">
                    <FileText className="w-3 h-3 mr-1.5" />
                    Assignments
                  </div>
                  <div className="chip">
                    <Award className="w-3 h-3 mr-1.5" />
                    Grades
                  </div>
                  <div className="chip">
                    <GitBranchPlus className="w-3 h-3 mr-1.5" />
                    Rubrics
                  </div>
                </div>
              </div>
              <div className="platform-base"></div>
            </div>

            <div
              id="platform-tp"
              className="platform w-80 h-48"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="platform-content">
                <div className="flex items-center mb-3">
                  <img
                    src="/tpdog.svg"
                    alt="Teacher's Pet"
                    className="w-10 h-10 mr-3"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Teacher's Pet
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Our AI Autograder processes submissions to generate insights.
                </p>
                <div className="chip bg-blue-100 text-blue-800">
                  <Settings className="w-3 h-3 mr-1.5" />
                  AI Autograder
                </div>
              </div>
              <div
                className="platform-base"
                style={{ background: "linear-gradient(45deg, #FDB515, #facc15)" }}
              ></div>
            </div>

            <div
              id="platform-teacher"
              className="platform absolute bottom-0 right-0 w-80 h-48"
            >
              <div className="platform-content">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-3">
                    <CheckCircle className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Teacher Review
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Approve, revise, or append to the AI output with your voice.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="chip">
                    <CheckCircle className="w-3 h-3 mr-1.5" />
                    Approve
                  </div>
                  <div className="chip">
                    <Mic className="w-3 h-3 mr-1.5" />
                    Add Voice
                  </div>
                  <div className="chip">
                    <FileText className="w-3 h-3 mr-1.5" />
                    Revise
                  </div>
                </div>
              </div>
              <div
                className="platform-base"
                style={{ background: "linear-gradient(45deg, #0077fe, #3b82f6)" }}
              ></div>
            </div>

            {/* Connectors */}
            <svg
              className="absolute top-0 left-0 w-full h-full"
              style={{ zIndex: 1 }}
            >
              <path
                id="connector-1"
                d="M 320 96 C 400 96, 400 280, 480 300"
                stroke="url(#grad1)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10, 5"
              />
              <path
                id="connector-2"
                d="M 480 348 C 560 348, 560 532, 800 552"
                stroke="url(#grad2)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10, 5"
              />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#facc15", stopOpacity: 1 }}
                  />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#facc15", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#4ade80", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Fallback for Mobile */}
          <div className="lg:hidden flex flex-col items-center space-y-8 mt-16">
            {/* Step 1: Canvas */}
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 w-80 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <img
                    src="/canvas-logo.svg"
                    alt="Canvas"
                    className="w-12 h-12"
                  />
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#0077fe" }}
                >
                  Canvas Integration
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Students</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Assignments</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Grades & Rubrics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="lg:hidden">
              <div className="w-8 h-8 border-l-2 border-b-2 border-gray-400 transform rotate-45 -my-4"></div>
            </div>

            {/* Step 2: Teacher's Pet */}
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 w-80 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <img
                    src="/tpdog.svg"
                    alt="Teacher's Pet"
                    className="w-12 h-12"
                  />
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#0077fe" }}
                >
                  Teacher's Pet
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  AI-powered processing engine that analyzes submissions and
                  generates intelligent feedback
                </p>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <Settings className="w-3 h-3" />
                  <span>AI Autograder</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="lg:hidden">
              <div className="w-8 h-8 border-l-2 border-b-2 border-gray-400 transform rotate-45 -my-4"></div>
            </div>

            {/* Step 3: Teacher Review */}
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 w-80 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#0077fe" }}
                >
                  Teacher Review
                </h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Approve AI Output</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Mic className="w-4 h-4 text-blue-500" />
                    <span>Voice Feedback</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <FileText className="w-4 h-4 text-orange-500" />
                    <span>Revise & Finalize</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50/70">
          <div className="max-w-4xl mx-auto text-center py-20 px-4">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Grading?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of educators who are saving hours every week with
              Teacher's Pet.
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="px-8 py-3 rounded-lg font-medium text-lg flex items-center mx-auto transition-transform hover:scale-105"
              style={{ backgroundColor: "#0077fe", color: "white" }}
            >
              Get Started Free <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
