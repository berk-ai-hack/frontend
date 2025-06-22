import { useNavigate } from "react-router-dom";
import { Users, FileText, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const navigate = useNavigate();

  const classes = [
    {
      id: 1,
      name: "Reading and Composition",
      code: "ENGR1B",
      students: 5,
      assignments: 8,
      pendingGrading: 1,
      semester: "Spring 2025",
    },
    {
      id: 2,
      name: "Linear Algebra",
      code: "MATH54",
      students: 5,
      assignments: 6,
      pendingGrading: 1,
      semester: "Spring 2025",
    },
    {
      id: 3,
      name: "Comparative Literature",
      code: "COMLIT100",
      students: 5,
      assignments: 5,
      pendingGrading: 1,
      semester: "Spring 2025",
    },
  ];

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
          {/* Page Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#0077fe" }}
            >
              Your Classes
            </h1>
            <p className="text-gray-600">
              Manage your courses and track grading progress
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8" style={{ color: "#0077fe" }} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Classes
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {classes.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8" style={{ color: "#FDB515" }} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Students
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {classes.reduce((sum, cls) => sum + cls.students, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8" style={{ color: "#0077fe" }} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Assignments
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {classes.reduce((sum, cls) => sum + cls.assignments, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8" style={{ color: "#FDB515" }} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {classes.reduce(
                        (sum, cls) => sum + cls.pendingGrading,
                        0
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <Card
                key={cls.id}
                className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900 mb-1">
                        {cls.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {cls.code} • {cls.semester}
                      </p>
                    </div>
                    {cls.pendingGrading > 0 && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-2 rounded-full whitespace-nowrap">
                        {cls.pendingGrading} Left
                      </span>
                    )}
                    {cls.pendingGrading === 0 && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-2 rounded-full whitespace-nowrap">
                        All Graded
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{cls.students}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Assignments:</span>
                      <span className="font-medium">{cls.assignments}</span>
                    </div>

                    <Button
                      onClick={() =>
                        navigate(`/class/${cls.id}`, {
                          state: { className: cls.name, classCode: cls.code },
                        })
                      }
                      className="w-full mt-4"
                      style={{ backgroundColor: "#0077fe", color: "white" }}
                    >
                      View Class
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
