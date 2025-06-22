import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Check, RotateCcw, Send, Volume2, Loader2 } from "lucide-react";
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
  const [professorInput, setProfessorInput] = useState("");
  const [isModifyingFeedback, setIsModifyingFeedback] = useState(false);

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
      const feedbackData = JSON.parse(localStorage.getItem(`autoGradingFeedback_${assignmentId}`) || '{}');
      return feedbackData[currentStudent - 1] || null;
    } catch (error) {
      console.error('Error loading saved AI feedback:', error);
      return null;
    }
  };

  // Function to extract grade from AI feedback
  const extractGrade = (feedback: string) => {
    const gradeMatch = feedback.match(/Final Grade:\s*([A-Z][+-]?\s*\([^)]+\))/i);
    if (gradeMatch) {
      return gradeMatch[1]; // Returns "B+ (87/100)" from "Final Grade: B+ (87/100)"
    }
    return null;
  };

  // Function to remove grade line from feedback
  const removeGradeLine = (feedback: string) => {
    return feedback.replace(/Final Grade:\s*[A-Z][+-]?\s*\([^)]+\)/gi, '').trim();
  };

  const savedAIFeedback = getSavedAIFeedback();
  const extractedGrade = savedAIFeedback ? extractGrade(savedAIFeedback) : null;
  const aiFeedback = savedAIFeedback ? removeGradeLine(savedAIFeedback) : null;

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
    // Extract and save the grade from current AI feedback
    if (savedAIFeedback) {
      const currentGrade = extractGrade(savedAIFeedback);
      if (currentGrade) {
        const gradesData = JSON.parse(localStorage.getItem(`autoGradingGrades_${assignmentId}`) || '{}');
        gradesData[currentStudent - 1] = currentGrade;
        localStorage.setItem(`autoGradingGrades_${assignmentId}`, JSON.stringify(gradesData));
      }
    }

    // Mark the student as graded by updating auto-grading states
    const autoGradingStatesData = JSON.parse(localStorage.getItem(`autoGradingStates_${assignmentId}`) || '{}');
    autoGradingStatesData[currentStudent - 1] = 'completed';
    localStorage.setItem(`autoGradingStates_${assignmentId}`, JSON.stringify(autoGradingStatesData));

    toast({
      title: "Feedback Accepted",
      description: `AI feedback accepted for ${studentName}.`,
    });
    
    // Navigate to next student or back to assignment if last student
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
              studentNames[currentStudent] ||
              `Student ${currentStudent + 1}`,
            currentStudent: currentStudent + 1,
          },
        });
      } else {
        navigate(`/assignment/${assignmentId}`); // Go back to assignment page
        toast({
          title: "Grading Complete",
          description: "All students have been graded for this assignment.",
        });
      }
    }, 1500);
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

  const handleAskAIToModify = async () => {
    if (!professorInput.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter your modification request.",
        variant: "destructive",
      });
      return;
    }

    if (!savedAIFeedback) {
      toast({
        title: "No AI Feedback",
        description: "No AI feedback available to modify.",
        variant: "destructive",
      });
      return;
    }

    setIsModifyingFeedback(true);

    const maxRetries = 5;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Modifying AI feedback (Attempt ${attempt}/${maxRetries})`);
        console.log('Professor input:', professorInput);
        console.log('Initial feedback:', savedAIFeedback);

        // Make actual HTTP call to prompt_redo API with FormData
        // Similar to Python: data={'professor_input': professorInput, 'initial_feedback': savedAIFeedback}
        const formData = new FormData();
        
        // Add the data fields (equivalent to Python's data parameter)
        formData.append('professor_input', professorInput);
        formData.append('initial_feedback', savedAIFeedback);
        
        const response = await fetch('http://localhost:5000/api/prompt_redo', {
          method: 'POST',
          body: formData
          // Note: Don't set Content-Type header - browser will set it automatically with boundary for multipart/form-data
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Response:', result);

        const modifiedFeedback = result.feedback || result.response || 'Modified feedback generated successfully';

        // If we reach here, the API call was successful
        console.log(`Successfully modified AI feedback on attempt ${attempt}`);

        // Update the AI feedback with the modified version
        const feedbackData = JSON.parse(localStorage.getItem(`autoGradingFeedback_${assignmentId}`) || '{}');
        feedbackData[currentStudent - 1] = modifiedFeedback;
        localStorage.setItem(`autoGradingFeedback_${assignmentId}`, JSON.stringify(feedbackData));

        // Extract and save the updated grade
        const updatedGrade = extractGrade(modifiedFeedback);
        if (updatedGrade) {
          const gradesData = JSON.parse(localStorage.getItem(`autoGradingGrades_${assignmentId}`) || '{}');
          gradesData[currentStudent - 1] = updatedGrade;
          localStorage.setItem(`autoGradingGrades_${assignmentId}`, JSON.stringify(gradesData));
        }

        // Force a re-render by updating the component state
        window.location.reload();

        toast({
          title: "Feedback Modified",
          description: "AI feedback has been updated based on your input.",
        });

        setProfessorInput("");
        return; // Exit the retry loop on success

      } catch (error) {
        lastError = error as Error;
        console.error(`Attempt ${attempt} failed for AI feedback modification:`, error);
        
        // If this is not the last attempt, wait a bit before retrying
        if (attempt < maxRetries) {
          const retryDelay = 1000 + Math.random() * 2000; // 1-3 second delay between retries
          console.log(`Retrying in ${Math.round(retryDelay)}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    // If we reach here, all attempts failed
    console.error(`All ${maxRetries} attempts failed for AI feedback modification`);
    toast({
      title: "Modification Failed",
      description: `Failed to modify AI feedback after ${maxRetries} attempts. Please try again.`,
      variant: "destructive",
    });

    setIsModifyingFeedback(false);
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
                  onClick={() => navigate(`/assignment/${assignmentId}`)}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
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
            {/* Top Right - AI Feedback and Grade */}
            <div className="h-1/2 bg-white/90 backdrop-blur-sm border-b border-gray-200 flex">
              {/* AI Feedback Section */}
              <div className="flex-1">
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
                            const originalLine = line;
                            
                            // Skip lines that start with + (these are formatting artifacts)
                            if (trimmedLine.startsWith('+')) {
                              return null;
                            }
                            
                            // Skip lines that start with -- (these are formatting artifacts)
                            if (trimmedLine.startsWith('--')) {
                              return null;
                            }
                            
                            // Handle markdown headings (#, ##, ###)
                            if (originalLine.startsWith('#')) {
                              const headingMatch = originalLine.match(/^(#{1,3})\s*(.+)$/);
                              if (headingMatch) {
                                const [, hashes, text] = headingMatch;
                                const level = hashes.length;
                                
                                // Apply different styling based on heading level
                                const headingClasses = {
                                  1: 'text-xl font-bold text-gray-900 mt-6 mb-3', // # heading
                                  2: 'text-lg font-semibold text-gray-900 mt-5 mb-2', // ## heading
                                  3: 'text-base font-medium text-gray-900 mt-4 mb-2' // ### heading
                                };
                                
                                return (
                                  <div 
                                    key={index} 
                                    className={headingClasses[level as keyof typeof headingClasses]}
                                  >
                                    {text}
                                  </div>
                                );
                              }
                            }
                            
                            // Handle bold text (text between **)
                            if (trimmedLine.includes('**')) {
                              const formattedLine = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                              // Remove any remaining asterisks that weren't part of bold formatting
                              const cleanLine = formattedLine.replace(/\*/g, '');
                              return (
                                <div 
                                  key={index} 
                                  className="text-gray-700 mb-1"
                                  dangerouslySetInnerHTML={{ __html: cleanLine }}
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

              {/* Grade Section */}
              {extractedGrade && (
                <div className="w-48 border-l border-gray-200">
                  <Card className="h-full border border-gray-200 bg-white/90 backdrop-blur-sm rounded-none">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                        <div
                          className="h-2 w-2 rounded-full mr-2"
                          style={{ backgroundColor: "#FDB515" }}
                        ></div>
                        Rec. Grade
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {extractedGrade}
                        </div>
                        <div className="text-xs text-gray-500">
                          AI Recommendation
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
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
                    {/* AI Feedback Modification Section */}
                    {savedAIFeedback && (
                      <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                        <h4 className="text-sm font-medium text-gray-900">Modify AI Feedback</h4>
                        <div className="space-y-2">
                          <textarea
                            value={professorInput}
                            onChange={(e) => setProfessorInput(e.target.value)}
                            placeholder="Enter your modification request for the AI feedback..."
                            className="w-full p-2 text-sm border border-gray-300 rounded-md resize-none"
                            rows={3}
                          />
                          <Button
                            onClick={handleAskAIToModify}
                            disabled={!professorInput.trim() || isModifyingFeedback}
                            className="w-full py-2 text-sm"
                            style={{ backgroundColor: "#0077fe", color: "white" }}
                          >
                            {isModifyingFeedback ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Modifying...
                              </>
                            ) : (
                              "Ask AI to Modify"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

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
