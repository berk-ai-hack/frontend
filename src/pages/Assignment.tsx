import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Play, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";

const Assignment = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAutoGradeDialog, setShowAutoGradeDialog] = useState(false);
  const [gradingCriteria, setGradingCriteria] = useState("");
  const [isAutoGrading, setIsAutoGrading] = useState(false);

  const {
    assignmentName = "Problem Set 1: Vector Operations and Linear Combinations",
    className = "Linear Algebra",
    classCode = "MATH54",
    assignmentId = 1,
  } = location.state || {};

  const [autoGradingStates, setAutoGradingStates] = useState<{ [key: number]: 'idle' | 'processing' | 'completed' | 'error' }>(() => {
    // Load saved auto-grading states from localStorage
    const saved = localStorage.getItem(`autoGradingStates_${assignmentId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [autoGradingFeedback, setAutoGradingFeedback] = useState<{ [key: number]: string }>(() => {
    // Load saved auto-grading feedback from localStorage
    const saved = localStorage.getItem(`autoGradingFeedback_${assignmentId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const humanizeDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  // Check if this assignment is fully graded and approved
  // First 4 assignments (Problem Set 1, Quiz 1, Problem Set 2, Midterm) are fully approved
  // Last assignment (Problem Set 3) is only autograded but not teacher approved
  const isFullyGraded = assignmentId <= 4;

  // Generate 5 dummy students with realistic submission dates
  const students = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: [
      "Emma Johnson",
      "Liam Smith",
      "Olivia Brown",
      "Noah Davis",
      "Ava Wilson",
    ][index],
    submissionUrl: `https://canvas.example.com/submission_${index + 1}.pdf`,
    submittedAt: `2024-05-${String(
      Math.max(20, 30 - Math.floor(index / 2))
    ).padStart(2, "0")} 11:30 PM`,
    status: isFullyGraded ? "graded" : "pending",
  }));

  const pendingStudents = students.filter(
    (student) => student.status === "pending"
  );
  const gradedCount = students.filter(
    (student) => student.status === "graded"
  ).length;

  // Helper function to save auto-grading states to localStorage
  const saveAutoGradingStates = (states: { [key: number]: 'idle' | 'processing' | 'completed' | 'error' }) => {
    localStorage.setItem(`autoGradingStates_${assignmentId}`, JSON.stringify(states));
  };

  // Helper function to clear saved auto-grading states
  const clearAutoGradingStates = () => {
    localStorage.removeItem(`autoGradingStates_${assignmentId}`);
  };

  // Helper function to save auto-grading feedback to localStorage
  const saveAutoGradingFeedback = (feedback: { [key: number]: string }) => {
    localStorage.setItem(`autoGradingFeedback_${assignmentId}`, JSON.stringify(feedback));
  };

  // Helper function to clear saved auto-grading feedback
  const clearAutoGradingFeedback = () => {
    localStorage.removeItem(`autoGradingFeedback_${assignmentId}`);
  };

  // Wrapper function to update auto-grading states and save them
  const updateAutoGradingStates = (updater: (prev: { [key: number]: 'idle' | 'processing' | 'completed' | 'error' }) => { [key: number]: 'idle' | 'processing' | 'completed' | 'error' }) => {
    setAutoGradingStates(prev => {
      const newStates = updater(prev);
      saveAutoGradingStates(newStates);
      return newStates;
    });
  };

  // Wrapper function to update auto-grading feedback and save it
  const updateAutoGradingFeedback = (updater: (prev: { [key: number]: string }) => { [key: number]: string }) => {
    setAutoGradingFeedback(prev => {
      const newFeedback = updater(prev);
      saveAutoGradingFeedback(newFeedback);
      return newFeedback;
    });
  };

  // Auto-grading functions
  const handleAutoGradeClick = () => {
    setShowAutoGradeDialog(true);
  };

  const handleResetAutoGradingStates = () => {
    if (window.confirm('Are you sure you want to clear all auto-grading results? This action cannot be undone.')) {
      clearAutoGradingStates();
      clearAutoGradingFeedback();
      setAutoGradingStates({});
      setAutoGradingFeedback({});
    }
  };

  const handleStartAutoGrading = async () => {
    if (!gradingCriteria.trim()) {
      alert("Please enter grading criteria");
      return;
    }

    setShowAutoGradeDialog(false);
    setIsAutoGrading(true);
    
    // Clear any previous auto-grading states for this assignment
    clearAutoGradingStates();
    clearAutoGradingFeedback();
    
    // Initialize all students to processing state
    const initialStates: { [key: number]: 'idle' | 'processing' | 'completed' | 'error' } = {};
    students.forEach((_, index) => {
      initialStates[index] = 'processing';
    });
    updateAutoGradingStates(prev => initialStates);
    setAutoGradingFeedback({});

    // Process each student sequentially
    for (let i = 0; i < students.length; i++) {
      try {
        const result = await autoGradeStudent(i, students[i]);
        if (result.success && result.feedback) {
          // Save the AI feedback
          updateAutoGradingFeedback(prev => ({ ...prev, [i]: result.feedback }));
        }
        updateAutoGradingStates(prev => ({ ...prev, [i]: 'completed' }));
      } catch (error) {
        console.error(`Error auto-grading student ${i + 1}:`, error);
        updateAutoGradingStates(prev => ({ ...prev, [i]: 'error' }));
      }
    }

    setIsAutoGrading(false);
  };

  const autoGradeStudent = async (studentIndex: number, student: any) => {
    const maxRetries = 5;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Auto-grading student ${studentIndex + 1}: ${student.name} (Attempt ${attempt}/${maxRetries})`);
        console.log('Grading criteria:', gradingCriteria);
        console.log('PDF file:', `/essays/essay${studentIndex + 1}.pdf`);

        // Simulate API call to prompt_initial
        // In a real implementation, this would call your actual API
        const result = await new Promise<{ success: boolean; feedback?: string; error?: string }>((resolve, reject) => {
          setTimeout(() => {
            // Simulate API response with higher failure rate for testing retry logic
            if (Math.random() > 0.3) { // 70% success rate
              // Simulate AI-generated feedback
              const feedback = generateMockFeedback(student.name, studentIndex + 1, gradingCriteria);
              resolve({ success: true, feedback });
            } else {
              resolve({ success: false, error: `API call failed on attempt ${attempt}` });
            }
          }, 2000 + Math.random() * 3000); // Random delay between 2-5 seconds
        });

        if (result.success && result.feedback) {
          // If we reach here, the API call was successful
          console.log(`Successfully auto-graded student ${studentIndex + 1} on attempt ${attempt}`);
          return { success: true, feedback: result.feedback };
        } else {
          throw new Error(result.error || 'API call failed');
        }

      } catch (error) {
        lastError = error as Error;
        console.error(`Attempt ${attempt} failed for student ${studentIndex + 1}:`, error);
        
        // If this is not the last attempt, wait a bit before retrying
        if (attempt < maxRetries) {
          const retryDelay = 1000 + Math.random() * 2000; // 1-3 second delay between retries
          console.log(`Retrying in ${Math.round(retryDelay)}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    // If we reach here, all attempts failed
    console.error(`All ${maxRetries} attempts failed for student ${studentIndex + 1}`);
    throw lastError || new Error('Auto-grading failed after all retry attempts');
  };

  // Helper function to generate mock AI feedback
  const generateMockFeedback = (studentName: string, studentNumber: number, criteria: string) => {
    const feedbackTemplates = [
      `**Positive Aspects:**
- ${studentName} demonstrates strong analytical thinking in their essay
- The argument structure is well-organized and logical
- Good use of evidence to support claims
- Writing style is clear and engaging

**Areas for Improvement:**
- Some claims could be supported with more specific examples
- Consider expanding on the counter-arguments
- The conclusion could be more comprehensive

**Suggestions:**
- Review the grading criteria: "${criteria}"
- Focus on strengthening the weakest arguments
- Great potential for improvement in future assignments

**Grade Recommendation:** ${Math.floor(Math.random() * 20) + 75}/100`,

      `**Strengths:**
- Excellent understanding of the core concepts
- ${studentName} shows creativity in their approach
- Strong technical skills demonstrated
- Good attention to detail

**Weaknesses:**
- Some sections lack depth of analysis
- Could benefit from more critical thinking
- Formatting could be improved

**Recommendations:**
- Based on criteria: "${criteria}"
- Consider peer review for future assignments
- Focus on developing stronger conclusions

**Grade Recommendation:** ${Math.floor(Math.random() * 25) + 70}/100`,

      `**Outstanding Work:**
- ${studentName} exceeds expectations in several areas
- Exceptional clarity of expression
- Innovative approach to the problem
- Comprehensive coverage of the topic

**Minor Issues:**
- A few technical errors that can be easily corrected
- Some formatting inconsistencies

**Overall Assessment:**
- Criteria evaluation: "${criteria}"
- Excellent work that shows real understanding
- Ready for advanced level challenges

**Grade Recommendation:** ${Math.floor(Math.random() * 15) + 80}/100`
    ];

    return feedbackTemplates[studentNumber % feedbackTemplates.length];
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button and Page Header */}
          <div className="mb-8">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Class
            </Button>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#0077fe" }}
                >
                  {assignmentName}
                </h1>
                <p className="text-gray-600">
                  {classCode} • {className} • Spring 2024
                </p>
              </div>

              {/* Grade Button */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {gradedCount}/{students.length} graded
                </span>
                <Button
                  onClick={handleAutoGradeClick}
                  disabled={gradedCount === students.length || isAutoGrading}
                  className={`px-4 py-2 ${
                    gradedCount === students.length || isAutoGrading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {isAutoGrading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Auto Grading...
                    </>
                  ) : (
                    "Auto Grade"
                  )}
                </Button>
                <Button
                  onClick={() =>
                    navigate("/grading-preview", {
                      state: {
                        assignmentName,
                        className,
                        classCode,
                        studentName: students[gradedCount].name,
                        currentStudent: gradedCount + 1,
                        totalStudents: students.length,
                        assignmentId,
                        essayNumber: gradedCount + 1,
                      },
                    })
                  }
                  disabled={gradedCount === students.length}
                  className={`px-4 py-2 ${
                    gradedCount === students.length
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Grade
                </Button>
              </div>
            </div>
          </div>

          {/* Assignment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="text-center">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "#0077fe" }}
                  >
                    {students.length}
                  </p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="text-center">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "#FDB515" }}
                  >
                    {gradedCount}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Processing
                      </span>
                    ) : (
                      <>
                        Graded
                        {isFullyGraded && (
                          <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                            Approved
                          </span>
                        )}
                      </>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="text-center">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "#0077fe" }}
                  >
                    {pendingStudents.length}
                  </p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="text-center">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "#FDB515" }}
                  >
                    100
                  </p>
                  <p className="text-sm text-gray-600">Total Points</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Students Table */}
          <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Student Submissions
                </CardTitle>
                {Object.keys(autoGradingStates).length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Auto-Grading Results Saved
                    </span>
                    <Button
                      onClick={handleResetAutoGradingStates}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Clear Results
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        #
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Student Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Submission
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Submitted
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">
                            {student.name}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            onClick={() =>
                              navigate("/grading-preview", {
                                state: {
                                  assignmentName,
                                  className,
                                  classCode,
                                  studentName: student.name,
                                  currentStudent: index + 1,
                                  totalStudents: students.length,
                                  assignmentId,
                                  essayNumber: index + 1,
                                },
                              })
                            }
                            variant="ghost"
                            className="flex items-center p-0 h-auto text-left"
                            style={{ color: "#0077fe" }}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            View Submission
                          </Button>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {humanizeDate(student.submittedAt)}
                        </td>
                        <td className="py-3 px-4">
                          {isProcessing ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              Processing
                            </span>
                          ) : isAutoGrading && autoGradingStates[index] === 'processing' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              Auto Grading
                            </span>
                          ) : autoGradingStates[index] === 'completed' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Auto Graded
                            </span>
                          ) : autoGradingStates[index] === 'error' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Auto Grade Failed
                            </span>
                          ) : (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                student.status === "graded"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {student.status === "graded" ? (
                                <>
                                  Graded
                                  {isFullyGraded && (
                                    <span className="ml-1 bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full text-xs font-medium">
                                      Approved
                                    </span>
                                  )}
                                </>
                              ) : (
                                "Pending"
                              )}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Auto Grade Dialog */}
      <Dialog open={showAutoGradeDialog} onOpenChange={setShowAutoGradeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Auto Grade Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="grading-criteria" className="text-sm font-medium">
                Grading Criteria
              </Label>
              <Textarea
                id="grading-criteria"
                placeholder="Enter the grading criteria that will be used to evaluate each student's submission..."
                value={gradingCriteria}
                onChange={(e) => setGradingCriteria(e.target.value)}
                className="mt-2 min-h-[120px]"
              />
              <p className="text-xs text-gray-500 mt-1">
                This criteria will be sent to the AI grading system along with each student's PDF submission.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAutoGradeDialog(false)}
              disabled={isAutoGrading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStartAutoGrading}
              disabled={!gradingCriteria.trim() || isAutoGrading}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              {isAutoGrading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Starting...
                </>
              ) : (
                "Start Auto Grading"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assignment;
