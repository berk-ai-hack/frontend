import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Check, RotateCcw, Send, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const GradingPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [feedback, setFeedback] = useState("");

  const {
    assignmentName = "Programming Assignment 1: Hello World",
    className = "Introduction to Computer Science",
    classCode = "CS 101",
    studentName = "Emma Johnson",
    currentStudent = 1,
    totalPending = 12,
    totalStudents = 50,
    assignmentId = 1,
    essayNumber,
  } = location.state || {};

  // Determine if this is a Reading and Composition assignment
  const isReadingAndComposition = className === "Reading and Composition";
  
  // Get the essay PDF path based on essayNumber (or assignmentId as fallback)
  const getEssayPath = () => {
    const num = essayNumber || assignmentId;
    if (isReadingAndComposition && num >= 1 && num <= 5) {
      return `/essays/essay${num}.pdf`;
    }
    return null;
  };

  const essayPath = getEssayPath();

  // Load saved AI feedback for this student
  const getSavedAIFeedback = () => {
    try {
      const savedFeedback = localStorage.getItem(`autoGradingFeedback_${assignmentId}`);
      if (savedFeedback) {
        const feedbackData = JSON.parse(savedFeedback);
        // Get feedback for current student (currentStudent - 1 because it's 0-indexed in storage)
        return feedbackData[currentStudent - 1] || null;
      }
    } catch (error) {
      console.error('Error loading saved AI feedback:', error);
    }
    return null;
  };

  const savedAIFeedback = getSavedAIFeedback();

  // Use saved AI feedback if available, otherwise show empty state
  const aiFeedback = savedAIFeedback || null;

  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording Started",
      description: "Speak your feedback for the student.",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
    setFeedback(
      "Great work on this assignment! Your code structure is very clean and readable. I particularly like how you've organized your functions and used meaningful variable names. For future assignments, consider adding more comments to explain your logic, especially in the more complex sections. The algorithm you chose is efficient and shows good understanding of the concepts. Keep up the excellent work!"
    );
    toast({
      title: "Recording Stopped",
      description: "Voice feedback captured successfully.",
    });
  };

  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback Submitted",
      description: `Feedback for ${studentName} has been saved and sent.`,
    });

    // Simulate moving to next student
    setTimeout(() => {
      if (currentStudent < totalStudents) {
        // Generate next student name (for demo purposes)
        const studentNames = [
          "Emma Johnson",
          "Liam Smith",
          "Olivia Brown",
          "Noah Davis",
          "Ava Wilson",
        ];

        navigate("/grading-preview", {
          state: {
            ...location.state,
            studentName:
              studentNames[currentStudent] || `Student ${currentStudent + 1}`,
            currentStudent: currentStudent + 1,
          },
        });
      } else {
        navigate(-1); // Go back to assignment page
        toast({
          title: "Grading Complete",
          description: "All students have been graded for this assignment.",
        });
      }
    }, 1500);
  };

  const handleAcceptFeedback = () => {
    toast({
      title: "Feedback Accepted",
      description: `AI feedback accepted for ${studentName}.`,
    });
    handleSubmitFeedback();
  };

  const handleRestart = () => {
    setIsRecording(false);
    setHasRecording(false);
    setFeedback("");
    toast({
      title: "Feedback Cleared",
      description: "You can now provide new feedback.",
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
        <Navigation />

        {/* Progress Bar */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => navigate(-1)}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Assignment
                </Button>
                {currentStudent > 1 && (
                  <Button
                    onClick={() => {
                      const studentNames = [
                        "Emma Johnson",
                        "Liam Smith",
                        "Olivia Brown",
                        "Noah Davis",
                        "Ava Wilson",
                      ];

                      navigate("/grading-preview", {
                        state: {
                          ...location.state,
                          studentName:
                            studentNames[currentStudent - 2] ||
                            `Student ${currentStudent - 1}`,
                          currentStudent: currentStudent - 1,
                        },
                      });
                    }}
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous Student
                  </Button>
                )}
              </div>
              <span className="text-sm text-gray-600">
                Student {currentStudent} of {totalStudents} (
                {Math.round((currentStudent / totalStudents) * 100)}% Complete)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentStudent / totalStudents) * 100}%`,
                  backgroundColor: "#0077fe",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="flex h-screen">
          {/* Left Half - PDF Viewer */}
          <div className="w-1/2 bg-white/90 backdrop-blur-sm border-r border-gray-200">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-900">
                  {studentName}'s Submission
                </h2>
                <p className="text-sm text-gray-600">
                  Assignment: {assignmentName}
                </p>
              </div>

              {/* PDF Viewer - Conditional Content */}
              <div className="flex-1 bg-gray-100/50 overflow-y-auto p-4">
                {essayPath ? (
                  // Display essay PDF for Reading and Composition
                  <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 max-w-full mx-auto border border-gray-200 h-full">
                    <div className="text-center mb-6">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {studentName}'s Essay
                      </h1>
                      <p className="text-sm text-gray-600">
                        {assignmentName}
                      </p>
                    </div>
                    
                    <div className="flex-1 h-full">
                      <iframe
                        src={essayPath}
                        className="w-full h-full min-h-[600px] border border-gray-200 rounded"
                        title={`${studentName}'s Essay - ${assignmentName}`}
                      />
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded text-xs text-gray-600 text-center">
                      <strong>Essay PDF</strong>
                      <br />
                      This is the student's submitted essay for grading.
                    </div>
                  </div>
                ) : (
                  // Display original AI Hackathon content for other assignments
                  <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 max-w-full mx-auto border border-gray-200">
                    <div className="text-center mb-6">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        AI Hackathon Guide
                      </h1>
                      <p className="text-sm text-gray-600">
                        Student Submission - Building an AI-Powered Application
                      </p>
                    </div>

                    <div className="space-y-6 text-sm text-gray-800">
                      <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                          1. Project Overview
                        </h2>
                        <p className="leading-relaxed mb-3">
                          Our team developed an AI-powered study assistant that
                          helps students organize their coursework and provides
                          personalized learning recommendations. The application
                          integrates natural language processing to understand
                          student queries and machine learning algorithms to adapt
                          to individual learning patterns.
                        </p>
                        <div
                          className="p-3 rounded border-l-4"
                          style={{
                            backgroundColor: "#0077fe",
                            opacity: 0.1,
                            borderColor: "#0077fe",
                          }}
                        >
                          <p className="font-medium" style={{ color: "#0077fe" }}>
                            Tech Stack:
                          </p>
                          <p style={{ color: "#0077fe" }}>
                            React.js, Python, OpenAI API, TensorFlow, MongoDB
                          </p>
                        </div>
                      </section>

                      <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                          2. Implementation Strategy
                        </h2>
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Frontend Development
                            </h3>
                            <p className="text-gray-700">
                              Built a responsive user interface using React.js
                              with Material-UI components. Implemented real-time
                              chat functionality for student-AI interactions.
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Backend Architecture
                            </h3>
                            <p className="text-gray-700">
                              Developed RESTful APIs using Python Flask.
                              Integrated OpenAI's GPT-4 for natural language
                              understanding and response generation.
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Machine Learning Pipeline
                            </h3>
                            <p className="text-gray-700">
                              Implemented a recommendation system using
                              collaborative filtering and content-based algorithms
                              to suggest relevant study materials.
                            </p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                          3. Key Features
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>
                            Intelligent chatbot for answering academic questions
                          </li>
                          <li>Personalized study schedule generation</li>
                          <li>Progress tracking and analytics dashboard</li>
                          <li>Collaborative study group formation</li>
                          <li>Resource recommendation engine</li>
                        </ul>
                      </section>

                      <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                          4. Challenges & Solutions
                        </h2>
                        <div
                          className="p-4 rounded"
                          style={{ backgroundColor: "#FDB515", opacity: 0.1 }}
                        >
                          <p
                            className="font-medium mb-2"
                            style={{ color: "#FDB515" }}
                          >
                            Challenge: API Rate Limiting
                          </p>
                          <p className="text-sm" style={{ color: "#FDB515" }}>
                            Solution: Implemented caching mechanisms and request
                            queuing to optimize API usage.
                          </p>
                        </div>
                        <div
                          className="p-4 rounded mt-3"
                          style={{ backgroundColor: "#0077fe", opacity: 0.1 }}
                        >
                          <p
                            className="font-medium mb-2"
                            style={{ color: "#0077fe" }}
                          >
                            Challenge: Data Privacy
                          </p>
                          <p className="text-sm" style={{ color: "#0077fe" }}>
                            Solution: Implemented end-to-end encryption and
                            GDPR-compliant data handling.
                          </p>
                        </div>
                      </section>

                      <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                          5. Results & Impact
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded">
                            <p
                              className="text-2xl font-bold"
                              style={{ color: "#0077fe" }}
                            >
                              85%
                            </p>
                            <p className="text-xs text-gray-600">
                              User Satisfaction
                            </p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded">
                            <p
                              className="text-2xl font-bold"
                              style={{ color: "#FDB515" }}
                            >
                              200+
                            </p>
                            <p className="text-xs text-gray-600">Beta Users</p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                          6. Future Roadmap
                        </h2>
                        <p className="text-gray-700">
                          Plans include expanding to multiple educational domains,
                          implementing voice interaction capabilities, and
                          developing mobile applications for iOS and Android.
                        </p>
                      </section>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded text-xs text-gray-600 text-center">
                      <strong>Student Submission PDF</strong>
                      <br />
                      This represents a comprehensive hackathon project
                      documentation submitted by the student.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Half - Split into Top and Bottom */}
          <div className="w-1/2 flex flex-col">
            {/* Top Right - AI Feedback */}
            <div className="h-1/2 bg-white/90 backdrop-blur-sm border-b border-gray-200">
              <Card className="h-full border border-gray-200 bg-white/90 backdrop-blur-sm rounded-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <div
                      className="h-2 w-2 rounded-full mr-2"
                      style={{ backgroundColor: "#0077fe" }}
                    ></div>
                    AI-Generated Feedback
                    {savedAIFeedback && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Auto-Graded
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full overflow-y-auto">
                  <div className="prose prose-sm max-w-none">
                    {aiFeedback ? (
                      <div className="text-sm text-gray-700">
                        {aiFeedback.split('\n').map((line, index) => {
                          const trimmedLine = line.trim();
                          
                          // Skip lines that start with + (these are formatting artifacts)
                          if (trimmedLine.startsWith('+')) {
                            return null;
                          }
                          
                          // Handle bold headers (text between **)
                          if (trimmedLine.includes('**')) {
                            const formattedLine = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                            return (
                              <div 
                                key={index} 
                                className="font-bold text-gray-900 mt-4 mb-2"
                                dangerouslySetInnerHTML={{ __html: formattedLine }}
                              />
                            );
                          }
                          // Handle bullet points
                          else if (trimmedLine.startsWith('-')) {
                            return (
                              <div key={index} className="flex items-start ml-4 mb-1">
                                <span className="text-gray-900 font-bold mr-2">•</span>
                                <span className="text-gray-700">{trimmedLine.substring(1).trim()}</span>
                              </div>
                            );
                          }
                          // Handle empty lines
                          else if (trimmedLine === '') {
                            return <div key={index} className="h-2" />;
                          }
                          // Handle regular text
                          else {
                            return (
                              <div key={index} className="text-gray-700 mb-1">
                                {trimmedLine}
                              </div>
                            );
                          }
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p className="text-sm">No AI feedback available</p>
                        <p className="text-xs mt-1">Run auto-grading to generate feedback</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Right - Feedback Controls */}
            <div className="h-1/2 bg-gray-50/50">
              <Card className="h-full border border-gray-200 bg-white/90 backdrop-blur-sm rounded-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Voice Feedback Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  {/* Recording Controls */}
                  <div className="space-y-4">
                    {!hasRecording ? (
                      <div className="text-center">
                        <Button
                          onClick={
                            isRecording
                              ? handleStopRecording
                              : handleStartRecording
                          }
                          className={`w-16 h-16 rounded-lg ${
                            isRecording ? "animate-pulse" : ""
                          }`}
                          style={{
                            backgroundColor: isRecording
                              ? "#ef4444"
                              : "#0077fe",
                            color: "white",
                          }}
                        >
                          <Mic className="h-8 w-8" />
                        </Button>
                        <p className="mt-2 text-sm text-gray-600">
                          {isRecording
                            ? "Recording... Click to stop"
                            : "Click to start recording"}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Recorded Feedback Display */}
                        <div
                          className="p-4 rounded-lg border"
                          style={{
                            backgroundColor: "#0077fe",
                            opacity: 0.1,
                            borderColor: "#0077fe",
                          }}
                        >
                          <div className="flex items-center mb-2">
                            <Volume2
                              className="h-4 w-4 mr-2"
                              style={{ color: "#0077fe" }}
                            />
                            <span
                              className="text-sm font-medium"
                              style={{ color: "#0077fe" }}
                            >
                              Recorded Feedback
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 italic">
                            "{feedback}"
                          </p>
                        </div>

                        {/* Action Buttons - New Layout */}
                        <div className="flex gap-3 justify-center">
                          <Button
                            onClick={
                              isRecording
                                ? handleStopRecording
                                : handleStartRecording
                            }
                            className={`w-12 h-12 rounded-lg ${
                              isRecording ? "animate-pulse" : ""
                            }`}
                            style={{
                              backgroundColor: isRecording
                                ? "#ef4444"
                                : "#0077fe",
                              color: "white",
                            }}
                          >
                            <Mic className="h-6 w-6" />
                          </Button>

                          <Button
                            onClick={handleAcceptFeedback}
                            className="w-12 h-12 rounded-lg text-white"
                            style={{ backgroundColor: "#FDB515" }}
                          >
                            <Check className="h-6 w-6" />
                          </Button>

                          <Button
                            onClick={handleRestart}
                            className="w-12 h-12 rounded-lg text-white"
                            style={{ backgroundColor: "#6b7280" }}
                          >
                            <RotateCcw className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="mt-auto pt-6 space-y-3">
                    <Button
                      onClick={handleAcceptFeedback}
                      className="w-full py-3 text-white"
                      style={{ backgroundColor: "#FDB515" }}
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Accept AI Feedback & Continue
                    </Button>

                    <Button
                      onClick={handleRestart}
                      variant="outline"
                      className="w-full border-gray-300 py-3"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Restart Grading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingPreview;
