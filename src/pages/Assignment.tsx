import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Assignment = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    assignmentName = "Problem Set 1: Vector Operations and Linear Combinations",
    className = "Linear Algebra",
    classCode = "MATH54",
  } = location.state || {};

  // Generate 50 dummy students
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
    submittedAt: "2024-09-14 11:30 PM",
    status: index < 38 ? "graded" : "pending",
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
                  {classCode} • {className}
                </p>
              </div>
            </div>

            {/* Assignment Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">
                  All Autograded: Yes
                </span>
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
                  <p className="text-sm text-gray-600">Graded</p>
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
              {pendingStudents.length > 0 && (
                <Button
                  onClick={() =>
                    navigate("/grading-preview", {
                      state: {
                        assignmentName,
                        className,
                        classCode,
                        studentName: pendingStudents[0].name,
                        currentStudent: 1,
                        totalPending: pendingStudents.length,
                      },
                    })
                  }
                  className="text-white"
                  style={{ backgroundColor: "#FDB515" }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Begin Grading
                </Button>
              )}
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
                          <a
                            href={student.submissionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                            style={{ color: "#0077fe" }}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            View Submission
                          </a>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {student.submittedAt}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              student.status === "graded"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {student.status === "graded" ? "Graded" : "Pending"}
                          </span>
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
