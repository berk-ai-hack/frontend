import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Play, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";

const Assignment = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    assignmentName = "Problem Set 1: Vector Operations and Linear Combinations",
    className = "Linear Algebra",
    classCode = "MATH54",
    assignmentId = 1,
  } = location.state || {};

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
  const isProcessingAssignment = assignmentId === 5;

  // Simulate processing completion after 3 seconds for assignment 5
  useEffect(() => {
    if (isProcessingAssignment) {
      setIsProcessing(true);
      const timer = setTimeout(() => {
        setIsProcessing(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isProcessingAssignment]);

  // Generate 50 dummy students with realistic submission dates
  const students = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: [
      "Emma Johnson",
      "Liam Smith",
      "Olivia Brown",
      "Noah Davis",
      "Ava Wilson",
      "Isabella Garcia",
      "Sophia Martinez",
      "Charlotte Anderson",
      "Amelia Taylor",
      "Mia Thomas",
      "Harper Jackson",
      "Evelyn White",
      "Abigail Harris",
      "Emily Martin",
      "Elizabeth Thompson",
      "Sofia Garcia",
      "Avery Rodriguez",
      "Ella Lewis",
      "Scarlett Lee",
      "Victoria Walker",
      "Madison Hall",
      "Luna Allen",
      "Grace Young",
      "Chloe Hernandez",
      "Penelope King",
      "Layla Wright",
      "Riley Lopez",
      "Zoey Hill",
      "Nora Scott",
      "Lily Green",
      "Eleanor Adams",
      "Hannah Baker",
      "Lillian Gonzalez",
      "Addison Nelson",
      "Aubrey Carter",
      "Ellie Mitchell",
      "Stella Perez",
      "Natalie Roberts",
      "Zoe Turner",
      "Leah Phillips",
      "Hazel Campbell",
      "Violet Parker",
      "Aurora Evans",
      "Savannah Edwards",
      "Audrey Collins",
      "Brooklyn Stewart",
      "Bella Sanchez",
      "Claire Morris",
      "Skylar Rogers",
      "Lucy Reed",
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
              <CardTitle className="text-xl font-bold text-gray-900">
                Student Submissions
              </CardTitle>
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
    </div>
  );
};

export default Assignment;
