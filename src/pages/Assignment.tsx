import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Play, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useState, useEffect, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

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
    status: "pending",
  }));

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

  // Function to extract grade from AI feedback
  const extractGrade = (feedback: string) => {
    console.log('Extracting grade from feedback:', feedback);
    const gradeMatch = feedback.match(/Grade:\s*(.*)/i);
    console.log('Grade match result:', gradeMatch);
    if (gradeMatch) {
      const grade = gradeMatch[1].trim(); // Returns everything after "Grade:" trimmed
      // Remove any characters after the closing parenthesis
      const cleanGrade = grade.replace(/\).*$/, ')');
      return cleanGrade;
    }
    return null;
  };

  // Function to save grades to localStorage
  const saveGrades = (grades: { [key: number]: string }) => {
    localStorage.setItem(`autoGradingGrades_${assignmentId}`, JSON.stringify(grades));
  };

  // Function to load grades from localStorage
  const loadGrades = () => {
    try {
      const gradesData = localStorage.getItem(`autoGradingGrades_${assignmentId}`);
      return gradesData ? JSON.parse(gradesData) : {};
    } catch (error) {
      console.error('Error loading grades:', error);
      return {};
    }
  };

  // Load saved grades
  const [grades, setGrades] = useState<{ [key: number]: string }>(loadGrades);

  // Function to reload grades from localStorage (memoized)
  const reloadGrades = useCallback(() => {
    try {
      const gradesData = localStorage.getItem(`autoGradingGrades_${assignmentId}`);
      if (gradesData) {
        setGrades(JSON.parse(gradesData));
      }
    } catch (error) {
      console.error('Error reloading grades:', error);
    }
  }, [assignmentId]);

  // Effect to reload grades when component mounts or assignmentId changes
  useEffect(() => {
    reloadGrades();
  }, [assignmentId]);

  // Effect to reload grades when page becomes active (user navigates back)
  useEffect(() => {
    const handleFocus = () => {
      reloadGrades();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [assignmentId]);

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
    clearAutoGradingStates();
    clearAutoGradingFeedback();
    setGrades({});
    localStorage.removeItem(`autoGradingGrades_${assignmentId}`);
    toast({
      title: "Results Cleared",
      description: "Auto-grading results have been cleared.",
    });
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
        if (result.success) {
          // Save the AI feedback
          updateAutoGradingFeedback(prev => ({ ...prev, [i]: result.feedback }));
          
          // Extract and save the grade
          const extractedGrade = extractGrade(result.feedback);
          if (extractedGrade) {
            setGrades(prev => {
              const newGrades = { ...prev, [i]: extractedGrade };
              saveGrades(newGrades);
              return newGrades;
            });
          }
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

        // Make actual HTTP call to prompt_initial API with file upload
        // Similar to Python: files={'pdf_file': (test_pdf_path, pdf_file, 'application/pdf')}
        const formData = new FormData();
        
        // Fetch the PDF file from the public directory
        const pdfResponse = await fetch(`/essays/essay${studentIndex + 1}.pdf`);
        const pdfBlob = await pdfResponse.blob();
        
        // Add the PDF file to FormData (equivalent to Python's files parameter)
        formData.append('pdf_file', pdfBlob, `essay${studentIndex + 1}.pdf`);
        
        // Add the explanation data (equivalent to Python's data parameter)
        formData.append('explanation', gradingCriteria);
        
        const response = await fetch('http://localhost:5000/api/prompt_initial', {
          method: 'POST',
          body: formData
          // Note: Don't set Content-Type header - browser will set it automatically with boundary for multipart/form-data
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Response:', result);

        // If we reach here, the API call was successful
        console.log(`Successfully auto-graded student ${studentIndex + 1} on attempt ${attempt}`);
        return { success: true, feedback: result.feedback || result.response || 'Feedback generated successfully' };

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
                  {students.length} students
                </span>
                <Button
                  onClick={handleAutoGradeClick}
                  disabled={students.length === 0 || isAutoGrading}
                  className={`px-4 py-2 ${
                    students.length === 0 || isAutoGrading
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
                        studentName: students[students.length - 1].name,
                        currentStudent: students.length,
                        totalStudents: students.length,
                        assignmentId,
                        essayNumber: students.length,
                      },
                    })
                  }
                  disabled={students.length === 0}
                  className={`px-4 py-2 ${
                    students.length === 0
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
                    {students.length}
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
                        Grade
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
                          {grades[index] ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 font-semibold">
                              {grades[index]}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
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
