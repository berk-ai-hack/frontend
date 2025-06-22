import { useNavigate } from "react-router-dom";
import { Users, FileText, Award, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Tilt } from "react-tilt";

const Index = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPosition = window.innerHeight * 0.3; // Trigger at 30% of viewport height
      if (scrollPosition > triggerPosition && !isScrolled) {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const scrollToFeatures = () => {
    setIsScrolled(true); // Show content immediately when button is clicked
    document.getElementById("features-section")?.scrollIntoView({
      behavior: "smooth",
    });
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
                <span
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  onClick={() => navigate("/how-it-works")}
                >
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
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Logo Comparison at Top */}
          <div className="flex justify-center items-center mb-8 space-x-8">
            <div className="flex items-center space-x-3">
              <img
                src="https://canvas.ucr.edu/media/296/download?attachment"
                alt="Gradescope Logo"
                className="h-8 w-auto opacity-60"
              />
              <span className="text-red-500 text-2xl font-bold">✕</span>
            </div>
            <div className="text-gray-400 text-lg">vs</div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <img
                  src="/tpdog.svg"
                  alt="Teacher's Pet Dog"
                  className="h-6 w-auto mr-1"
                />
                <img
                  src="/teacher_s pet logo.svg"
                  alt="Teacher's Pet Logo"
                  className="h-6 w-auto"
                />
              </div>
              <span className="text-green-500 text-2xl font-bold">✓</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="lg:ml-16">
              <div className="flex space-x-3 mb-6">
                <span
                  className="px-3 py-1 rounded-full text-xs"
                  style={{ backgroundColor: "#FDB515", color: "white" }}
                >
                  Built for Educators
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs flex items-center"
                  style={{ backgroundColor: "#D77655", color: "white" }}
                >
                  Powered by Claude
                  <img
                    src="/claude.svg"
                    alt="Claude logo"
                    className="ml-1 w-4 h-4"
                  />
                </span>
              </div>

              <h1 className="text-5xl font-bold mb-4 leading-tight">
                <span style={{ color: "#FDB515" }}>We Fetch</span>
                <span style={{ color: "#6B7280" }}>.</span>
                <br />
                <span style={{ color: "#0077fe" }}>You Teach</span>
                <span style={{ color: "#6B7280" }}>.</span>
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Teacher's Pet is an AI agent that frees teachers from
                repetitive, tiring work so they can focus on what matters most —
                teaching.
              </p>

              <div className="mb-6">
                <Button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2 rounded-lg font-medium flex items-center"
                  style={{ backgroundColor: "#0077fe", color: "white" }}
                >
                  Get Started <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <p className="text-sm text-gray-500">
                FERPA Compliant | COPPA Compliant
              </p>
            </div>

            {/* Right side - Dashboard mockup */}
            <div className="relative lg:mr-16">
              <Tilt
                options={{
                  reverse: false,
                  max: 8,
                  perspective: 1000,
                  scale: 1.02,
                  speed: 1000,
                  transition: true,
                  axis: null,
                  reset: true,
                  easing: "cubic-bezier(.03,.98,.52,.99)",
                }}
              >
                <div
                  className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 transform-gpu transition-all duration-300 hover:shadow-2xl shadow-xl"
                  style={{
                    transform:
                      "perspective(1000px) rotateY(-10deg) rotateX(2deg) translateZ(10px)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.5)",
                    animation: "float 4s ease-in-out infinite",
                  }}
                >
                  <div className="bg-white/90 rounded-lg p-3 border border-gray-200">
                    {/* Main content area */}
                    <div className="flex gap-3 h-56">
                      {/* Left half - PDF */}
                      <div className="w-1/2 bg-gray-100 rounded-lg p-2 border border-gray-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600 font-medium">
                            student_assignment.pdf
                          </span>
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        <div className="bg-white rounded border border-gray-200 p-2 h-40 overflow-hidden">
                          <div className="space-y-1">
                            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                            <div className="h-2 bg-gray-300 rounded w-4/5"></div>
                            <div className="h-2 bg-gray-300 rounded w-1/3"></div>
                            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>

                      {/* Right half - Split into two panes */}
                      <div className="w-1/2 flex flex-col gap-2">
                        {/* Top right - AI Feedback */}
                        <div className="flex-1 bg-blue-50 rounded-lg p-2 border border-blue-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-blue-700 font-medium">
                              AI Feedback
                            </span>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="text-xs text-blue-800 leading-relaxed">
                            <p>
                              Great work on the thesis statement! Your argument
                              is clear and well-structured. Consider adding more
                              specific examples in paragraph 3 to strengthen
                              your supporting evidence.
                            </p>
                          </div>
                        </div>

                        {/* Bottom right - Teacher Controls */}
                        <div className="bg-gray-100 rounded-lg p-2 border border-gray-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
                                <svg
                                  className="w-3 h-3 text-gray-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <span className="text-xs text-gray-600">
                                Voice Note
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <button className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors">
                                Accept
                              </button>
                              <button className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors">
                                Restart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </div>

          {/* View Features Button */}
          <div className="flex justify-center mt-12">
            <button
              onClick={scrollToFeatures}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
            >
              <span className="text-sm font-medium">View Features</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Features Section - Hidden until scroll */}
        <div
          id="features-section"
          className={`grid md:grid-cols-3 gap-12 mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            isScrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#FDB515" }}
            >
              <img src="/book.svg" alt="Book" className="h-8 w-8 text-white" />
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
              style={{ backgroundColor: "#FDB515" }}
            >
              <img
                src="/lightbulb.svg"
                alt="Lightbulb"
                className="h-8 w-8 text-white"
              />
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
              <img
                src="/pencil.svg"
                alt="Pencil"
                className="h-8 w-8 text-white"
              />
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

        {/* Comparison Section - Better than Gradescope */}
        <div
          className={`mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 transition-all duration-1000 delay-500 ${
            isScrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#0077fe" }}
            >
              Why Choose Teacher's Pet Over Gradescope?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              While Gradescope focuses on automated grading, Teacher's Pet goes
              beyond to create meaningful teaching experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start perspective-1000">
            {/* Gradescope Column */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 transform-gpu transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-400/50 cursor-pointer group relative overflow-hidden">
              {/* 3D Water Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating Shadow */}
              <div className="absolute -bottom-2 left-4 right-4 h-4 bg-gray-300/30 rounded-full blur-md transform scale-x-90 group-hover:scale-x-110 group-hover:opacity-50 transition-all duration-300"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src="https://canvas.ucr.edu/media/296/download?attachment"
                    alt="Gradescope Logo"
                    className="h-10 w-auto opacity-80 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-6 text-center text-gray-700 transition-transform duration-300 group-hover:scale-105">
                  Traditional Grading Platform
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 transform transition-all duration-200 hover:translate-x-1">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <span className="text-red-600 text-sm">✕</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Limited to Multiple Choice & Rubrics
                      </p>
                      <p className="text-sm text-gray-600">
                        Rigid grading formats that don't adapt to different
                        assignment types
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 transform transition-all duration-200 hover:translate-x-1">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <span className="text-red-600 text-sm">✕</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        No Personal Touch
                      </p>
                      <p className="text-sm text-gray-600">
                        Generic feedback that doesn't build student-teacher
                        relationships
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 transform transition-all duration-200 hover:translate-x-1">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <span className="text-red-600 text-sm">✕</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Time-Consuming Setup
                      </p>
                      <p className="text-sm text-gray-600">
                        Requires manual rubric creation and answer key setup for
                        each assignment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 transform transition-all duration-200 hover:translate-x-1">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <span className="text-red-600 text-sm">✕</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        No AI-Powered Insights
                      </p>
                      <p className="text-sm text-gray-600">
                        Misses opportunities to provide intelligent, contextual
                        feedback
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher's Pet Column */}
            <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-xl p-8 border-2 border-blue-200 relative transform-gpu transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-400/50 cursor-pointer group overflow-hidden">
              {/* 3D Water Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-yellow-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating Shadow */}
              <div className="absolute -bottom-2 left-4 right-4 h-4 bg-blue-300/40 rounded-full blur-md transform scale-x-90 group-hover:scale-x-110 group-hover:opacity-60 transition-all duration-300"></div>

              <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                RECOMMENDED
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center transform transition-all duration-300 group-hover:scale-110">
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
                <h3
                  className="text-xl font-semibold mb-6 text-center transform transition-all duration-300 group-hover:scale-105"
                  style={{ color: "#0077fe" }}
                >
                  AI-Powered Teaching Assistant
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 transform transition-all duration-200 hover:translate-x-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Universal Assignment Support
                      </p>
                      <p className="text-sm text-gray-600">
                        Handles essays, projects, creative work, and any
                        assignment type with intelligent analysis
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 transform transition-all duration-200 hover:translate-x-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Personalized Voice Feedback
                      </p>
                      <p className="text-sm text-gray-600">
                        Add your voice to create meaningful connections and show
                        students you care
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 transform transition-all duration-200 hover:translate-x-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Zero Setup Required
                      </p>
                      <p className="text-sm text-gray-600">
                        Just upload assignments and let AI do the heavy lifting
                        - no manual configuration needed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 transform transition-all duration-200 hover:translate-x-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Claude-Powered Intelligence
                      </p>
                      <p className="text-sm text-gray-600">
                        Advanced AI that understands context, provides detailed
                        feedback, and learns your teaching style
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Differentiators */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">🎯</span>
              </div>
              <h4 className="font-semibold mb-2" style={{ color: "#0077fe" }}>
                10x Faster Grading
              </h4>
              <p className="text-sm text-gray-600">
                Complete grading in minutes, not hours
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-600 text-xl">💬</span>
              </div>
              <h4 className="font-semibold mb-2" style={{ color: "#0077fe" }}>
                Voice-Enhanced Feedback
              </h4>
              <p className="text-sm text-gray-600">
                Personal touch that Gradescope can't match
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">🤖</span>
              </div>
              <h4 className="font-semibold mb-2" style={{ color: "#0077fe" }}>
                AI That Understands
              </h4>
              <p className="text-sm text-gray-600">
                Context-aware feedback, not just pattern matching
              </p>
            </div>
          </div>
        </div>

        {/* Integrations and Trusted By Section - Hidden until scroll */}
        <div
          className={`mt-16 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 transition-all duration-1000 delay-300 ${
            isScrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          {/* Integrations Section */}
          <div className="text-center">
            <p className="text-black font-semibold text-base mb-8">
              Integrates with
            </p>
            <div className="flex flex-col items-center space-y-4">
              {/* D2L Brightspace */}
              <div className="flex items-center w-48 justify-center">
                <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">D2L</span>
                </div>
                <span className="text-gray-600 text-base">Brightspace</span>
              </div>

              {/* Canvas */}
              <div className="flex items-center w-48 justify-center">
                <img
                  src="https://www.instructure.com/sites/default/files/image/2021-12/Canvas_logo_single_mark.png"
                  alt="Canvas Logo"
                  className="w-10 h-10 mr-3"
                  style={{ filter: "brightness(1.2) saturate(1.3)" }}
                />
                <span className="text-gray-600 text-base">Canvas</span>
              </div>

              {/* Google Classroom */}
              <div className="flex items-center w-48 justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png"
                  alt="Google Classroom Logo"
                  className="w-10 h-10 mr-3"
                  style={{ filter: "brightness(1.2) saturate(1.3)" }}
                />
                <span className="text-gray-600 text-base">
                  Google Classroom
                </span>
              </div>
            </div>
          </div>

          {/* Trusted By Section */}
          <div className="text-center">
            <p className="text-black font-semibold text-base mb-8">
              Trusted by teachers at
            </p>
            <div className="flex justify-center items-center">
              <img
                src="https://logos-world.net/wp-content/uploads/2022/02/UC-Berkeley-Symbol.png"
                alt="UC Berkeley Logo"
                className="h-28 opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
