import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Calendar, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Class = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { className = "Linear Algebra", classCode = "MATH54" } =
    location.state || {};

  const assignments = [
    {
      id: 1,
      name: "Problem Set 1: Vector Operations and Linear Combinations",
      dueDate: "2024-09-15",
      totalStudents: 45,
      submitted: 43,
      graded: 38,
      type: "Problem Set",
      points: 100,
    },
    {
      id: 2,
      name: "Quiz 1: Matrix Operations and Gaussian Elimination",
      dueDate: "2024-09-22",
      totalStudents: 45,
      submitted: 45,
      graded: 45,
      type: "Quiz",
      points: 50,
    },
    {
      id: 3,
      name: "Problem Set 2: Linear Transformations and Determinants",
      dueDate: "2024-09-29",
      totalStudents: 45,
      submitted: 41,
      graded: 35,
      type: "Problem Set",
      points: 150,
    },
    {
      id: 4,
      name: "Midterm Exam",
      dueDate: "2024-10-13",
      totalStudents: 45,
      submitted: 44,
      graded: 20,
      type: "Exam",
      points: 200,
    },
    {
      id: 5,
      name: "Problem Set 3: Eigenvalues and Eigenvectors",
      dueDate: "2024-10-20",
      totalStudents: 45,
      submitted: 39,
      graded: 15,
      type: "Problem Set",
      points: 175,
    },
  ];

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
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Karina Palau</span>
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#0077fe" }}
                >
                  <span className="text-white text-sm font-medium">KP</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

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
                    <p className="text-2xl font-bold text-gray-900">45</p>
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
          <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer bg-white/50"
                    onClick={() =>
                      navigate(`/assignment/${assignment.id}`, {
                        state: {
                          assignmentName: assignment.name,
                          className: className,
                          classCode: classCode,
                        },
                      })
                    }
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {assignment.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            assignment.type
                          )}`}
                        >
                          {assignment.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Due: {assignment.dueDate}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {assignment.points} points
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {assignment.submitted}
                        </p>
                        <p className="text-sm text-gray-600">Submitted</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {assignment.graded}
                        </p>
                        <p className="text-sm text-gray-600">Graded</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {assignment.submitted - assignment.graded}
                        </p>
                        <p className="text-sm text-gray-600">Pending</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Grading Progress</span>
                        <span>
                          {Math.round(
                            (assignment.graded / assignment.submitted) * 100
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(
                            assignment.graded,
                            assignment.submitted
                          )}`}
                          style={{
                            width: `${
                              (assignment.graded / assignment.submitted) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      style={{ backgroundColor: "#0077fe", color: "white" }}
                    >
                      View Assignment Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Class;
