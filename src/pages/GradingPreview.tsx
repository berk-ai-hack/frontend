
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, Mic, MicOff, Check, RotateCcw, Send, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

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
    totalPending = 12
  } = location.state || {};

  const aiFeedback = `
**Positive Aspects:**
- Code structure is clean and well-organized
- Variable naming follows good conventions
- Proper use of comments to explain logic
- All required functionality is implemented

**Areas for Improvement:**
- Consider using more descriptive variable names in the main function
- The loop on line 23 could be optimized for better performance
- Missing error handling for edge cases

**Suggestions:**
- Review the efficiency of your sorting algorithm
- Consider adding input validation
- Great job on following the coding style guide

**Grade Recommendation:** 85/100
`;

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
    setFeedback("Great work on this assignment! Your code structure is very clean and readable. I particularly like how you've organized your functions and used meaningful variable names. For future assignments, consider adding more comments to explain your logic, especially in the more complex sections. The algorithm you chose is efficient and shows good understanding of the concepts. Keep up the excellent work!");
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
      if (currentStudent < totalPending) {
        navigate('/grading-preview', { 
          state: { 
            ...location.state,
            studentName: "Liam Smith", // Next student
            currentStudent: currentStudent + 1
          } 
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduGrade Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate(-1)}
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assignment
              </Button>
              <div className="text-right">
                <p className="text-sm text-gray-600">Student {currentStudent} of {totalPending}</p>
                <p className="text-sm font-medium text-gray-900">{studentName}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{assignmentName}</span>
            <span>{Math.round((currentStudent / totalPending) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentStudent / totalPending) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex h-screen">
        {/* Left Half - PDF Viewer */}
        <div className="w-1/2 bg-white border-r">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                {studentName}'s Submission
              </h2>
              <p className="text-sm text-gray-600">Assignment: {assignmentName}</p>
            </div>
            
            {/* PDF Placeholder */}
            <div className="flex-1 bg-gray-100 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
                  <div className="text-left space-y-4 font-mono text-sm">
                    <div className="text-gray-600">// Hello World Program</div>
                    <div className="text-blue-600">public class HelloWorld {`{`}</div>
                    <div className="pl-4 text-blue-600">public static void main(String[] args) {`{`}</div>
                    <div className="pl-8 text-green-600">System.out.println("Hello, World!");</div>
                    <div className="pl-4 text-blue-600">{`}`}</div>
                    <div className="text-blue-600">{`}`}</div>
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded text-xs text-gray-600">
                    <strong>Simulated PDF Content</strong><br />
                    This represents the student's submitted assignment. In a real implementation, 
                    this would be rendered using PDF.js or a similar library.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Half - Split into Top and Bottom */}
        <div className="w-1/2 flex flex-col">
          {/* Top Right - AI Feedback */}
          <div className="h-1/2 bg-white border-b">
            <Card className="h-full border-0 rounded-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  AI-Generated Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-sm text-gray-700">
                    {aiFeedback}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Right - Feedback Controls */}
          <div className="h-1/2 bg-gray-50">
            <Card className="h-full border-0 rounded-none">
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
                        onClick={isRecording ? handleStopRecording : handleStartRecording}
                        className={`w-20 h-20 rounded-full ${
                          isRecording 
                            ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                      </Button>
                      <p className="mt-2 text-sm text-gray-600">
                        {isRecording ? "Recording... Click to stop" : "Click to start recording"}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Recorded Feedback Display */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Volume2 className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-blue-800">Recorded Feedback</span>
                        </div>
                        <p className="text-sm text-gray-700 italic">"{feedback}"</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          onClick={handleSubmitFeedback}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit
                        </Button>
                        <Button
                          onClick={handleRestart}
                          variant="outline"
                          className="border-gray-300"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Re-record
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-auto pt-6 space-y-3">
                  <Button
                    onClick={handleAcceptFeedback}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
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
  );
};

export default GradingPreview;
