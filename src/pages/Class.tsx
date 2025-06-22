import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Clock as ClockIcon,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";

const Class = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [processingAssignments, setProcessingAssignments] = useState<
    Set<number>
  >(new Set([5])); // Assignment 5 is processing

  // Simulate processing completion after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessingAssignments(new Set());
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const { className = "Linear Algebra", classCode = "MATH54" } =
    location.state || {};

  // Define assignments based on class type
  const getAssignments = () => {
    if (className === "Reading and Composition") {
      return [
        {
          id: 1,
          name: "Essay 1: Critical Analysis of 'The Great Gatsby'",
          dueDate: "2024-05-06",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Essay",
          points: 100,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 2,
          name: "Reading Response: 'To Kill a Mockingbird' Chapters 1-10",
          dueDate: "2024-05-13",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Essay",
          points: 50,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 3,
          name: "Research Paper: Literary Analysis of Modern American Fiction",
          dueDate: "2024-05-20",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Research Paper",
          points: 150,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 4,
          name: "Midterm Exam: Literary Theory and Analysis",
          dueDate: "2024-05-27",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Exam",
          points: 200,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 5,
          name: "Final Essay: Comparative Analysis of Two Novels",
          dueDate: "2024-06-03",
          totalStudents: 5,
          submitted: 5,
          graded: 0,
          type: "Essay",
          points: 175,
          aiStatus: "in_progress",
          gradingStatus: "autograded",
        },
      ];
    } else if (className === "Comparative Literature") {
      return [
        {
          id: 1,
          name: "Essay 1: Cross-Cultural Analysis of 'Don Quixote'",
          dueDate: "2024-05-06",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Essay",
          points: 100,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 2,
          name: "Reading Response: 'Madame Bovary' and Realism",
          dueDate: "2024-05-13",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Essay",
          points: 50,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 3,
          name: "Research Paper: Global Literary Movements",
          dueDate: "2024-05-20",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Research Paper",
          points: 150,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 4,
          name: "Midterm Exam: Comparative Literary Theory",
          dueDate: "2024-05-27",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Exam",
          points: 200,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 5,
          name: "Final Essay: World Literature Synthesis",
          dueDate: "2024-06-03",
          totalStudents: 5,
          submitted: 5,
          graded: 0,
          type: "Essay",
          points: 175,
          aiStatus: "in_progress",
          gradingStatus: "autograded",
        },
      ];
    } else {
      // Default math assignments for Linear Algebra
      return [
        {
          id: 1,
          name: "Problem Set 1: Vector Operations and Linear Combinations",
          dueDate: "2024-05-06",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Problem Set",
          points: 100,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 2,
          name: "Quiz 1: Matrix Operations and Gaussian Elimination",
          dueDate: "2024-05-13",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Quiz",
          points: 50,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 3,
          name: "Problem Set 2: Linear Transformations and Determinants",
          dueDate: "2024-05-20",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Problem Set",
          points: 150,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 4,
          name: "Midterm Exam",
          dueDate: "2024-05-27",
          totalStudents: 5,
          submitted: 5,
          graded: 5,
          type: "Exam",
          points: 200,
          aiStatus: "completed",
          gradingStatus: "approved",
        },
        {
          id: 5,
          name: "Problem Set 3: Eigenvalues and Eigenvectors",
          dueDate: "2024-06-03",
          totalStudents: 5,
          submitted: 5,
          graded: 0,
          type: "Problem Set",
          points: 175,
          aiStatus: "in_progress",
          gradingStatus: "autograded",
        },
      ];
    }
  };

  const assignments = getAssignments();

  // Reverse order to show most recent first
  const sortedAssignments = [...assignments].reverse();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Problem Set":
        return "bg-blue-100 text-blue-800";
      case "Quiz":
        return "bg-green-100 text-green-800";
      case "Exam":
        return "bg-red-100 text-red-800";
      case "Essay":
        return "bg-purple-100 text-purple-800";
      case "Research Paper":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (graded: number, total: number) => {
    const percentage = (graded / total) * 100;
    if (percentage === 100) return "bg-green-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getAIStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in_progress":
        return <ClockIcon className="h-4 w-4 text-yellow-600" />;
      case "not_started":
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAIStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "AI Graded";
      case "in_progress":
        return "AI Grading...";
      case "not_started":
        return "Not Started";
      default:
        return "Unknown";
    }
  };

  const getAIStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in_progress":
        return "text-yellow-600";
      case "not_started":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  const humanizeDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
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
              onClick={() => navigate("/dashboard")}
              variant="ghost"
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>

            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#0077fe" }}
                >
                  {className}
                </h1>
                <p className="text-gray-600">{classCode} • Fall 2024</p>
              </div>
            </div>
          </div>

          {/* Class Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8" style={{ color: "#0077fe" }} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Students
                    </p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8" style={{ color: "#FDB515" }} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Assignments
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {assignments.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8" style={{ color: "#0077fe" }} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Pending Grading
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {assignments.reduce(
                        (sum, assignment) =>
                          sum + (assignment.submitted - assignment.graded),
                        0
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8" style={{ color: "#FDB515" }} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Points
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {assignments.reduce(
                        (sum, assignment) => sum + assignment.points,
                        0
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assignments List */}
          <div className="max-w-7xl mx-auto">
            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Essays and Research Papers Column */}
                  <div>
                    <h3
                      className="text-lg font-semibold text-gray-900 mb-4"
                      style={{ color: "#0077fe" }}
                    >
                      {className === "Reading and Composition" || className === "Comparative Literature" 
                        ? "Essays & Papers" 
                        : "Homeworks"}
                    </h3>
                    <div className="space-y-3">
                      {sortedAssignments
                        .filter(
                          (assignment) => 
                            className === "Reading and Composition" || className === "Comparative Literature"
                              ? ["Essay", "Research Paper"].includes(assignment.type)
                              : assignment.type === "Problem Set"
                        )
                        .map((assignment) => (
                          <div
                            key={assignment.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white/50"
                            onClick={() =>
                              navigate(`/assignment/${assignment.id}`, {
                                state: {
                                  assignmentName: assignment.name,
                                  className: className,
                                  classCode: classCode,
                                  assignmentId: assignment.id,
                                },
                              })
                            }
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-gray-900 truncate">
                                  {assignment.name}
                                </h3>
                                <div className="flex items-center justify-between mt-1">
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                        assignment.type
                                      )}`}
                                    >
                                      {assignment.type}
                                    </span>
                                    <span className="text-xs text-gray-600">
                                      Due: {humanizeDate(assignment.dueDate)} •{" "}
                                      {assignment.points} pts
                                    </span>
                                  </div>
                                  {processingAssignments.has(assignment.id) ? (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                      Processing
                                    </span>
                                  ) : (
                                    (assignment.aiStatus === "completed" ||
                                      assignment.id === 5) && (
                                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                        Initial Autograding Done
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Minimal Progress Bar */}
                            <div className="mb-3">
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>Grading Progress</span>
                                <span>
                                  {assignment.graded === 0
                                    ? 0
                                    : Math.round(
                                        (assignment.graded /
                                          assignment.submitted) *
                                          100
                                      )}
                                  %
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${getProgressColor(
                                    assignment.graded,
                                    assignment.submitted
                                  )}`}
                                  style={{
                                    width: `${
                                      assignment.graded === 0
                                        ? 0
                                        : (assignment.graded /
                                            assignment.submitted) *
                                          100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            <Button
                              className="w-full text-sm py-2"
                              style={{
                                backgroundColor: "#0077fe",
                                color: "white",
                              }}
                            >
                              View Assignment Details
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Quizzes/Tests/Exams Column */}
                  <div>
                    <h3
                      className="text-lg font-semibold text-gray-900 mb-4"
                      style={{ color: "#FDB515" }}
                    >
                      Assessments
                    </h3>
                    <div className="space-y-3">
                      {sortedAssignments
                        .filter((assignment) =>
                          ["Quiz", "Exam", "Test"].includes(assignment.type)
                        )
                        .map((assignment) => (
                          <div
                            key={assignment.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white/50"
                            onClick={() =>
                              navigate(`/assignment/${assignment.id}`, {
                                state: {
                                  assignmentName: assignment.name,
                                  className: className,
                                  classCode: classCode,
                                  assignmentId: assignment.id,
                                },
                              })
                            }
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-gray-900 truncate">
                                  {assignment.name}
                                </h3>
                                <div className="flex items-center justify-between mt-1">
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                        assignment.type
                                      )}`}
                                    >
                                      {assignment.type}
                                    </span>
                                    <span className="text-xs text-gray-600">
                                      Due: {humanizeDate(assignment.dueDate)} •{" "}
                                      {assignment.points} pts
                                    </span>
                                  </div>
                                  {processingAssignments.has(assignment.id) ? (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                      Processing
                                    </span>
                                  ) : (
                                    (assignment.aiStatus === "completed" ||
                                      assignment.id === 5) && (
                                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                        Initial Autograding Done
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Minimal Progress Bar */}
                            <div className="mb-3">
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>Grading Progress</span>
                                <span>
                                  {assignment.graded === 0
                                    ? 0
                                    : Math.round(
                                        (assignment.graded /
                                          assignment.submitted) *
                                          100
                                      )}
                                  %
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${getProgressColor(
                                    assignment.graded,
                                    assignment.submitted
                                  )}`}
                                  style={{
                                    width: `${
                                      assignment.graded === 0
                                        ? 0
                                        : (assignment.graded /
                                            assignment.submitted) *
                                          100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            <Button
                              className="w-full text-sm py-2"
                              style={{
                                backgroundColor: "#0077fe",
                                color: "white",
                              }}
                            >
                              View Assignment Details
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class;
