import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Video, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Sync = () => {
  const [syncing, setSyncing] = useState({ canvas: false, bcourses: false });
  const [synced, setSynced] = useState({ canvas: false, bcourses: false });
  const navigate = useNavigate();

  const handleSync = (type: "canvas" | "bcourses") => {
    setSyncing((prev) => ({ ...prev, [type]: true }));

    setTimeout(() => {
      setSyncing((prev) => ({ ...prev, [type]: false }));
      setSynced((prev) => ({ ...prev, [type]: true }));
      toast({
        title: `${type === "canvas" ? "Canvas" : "bCourses"} Sync Complete`,
        description: "Your data has been successfully imported.",
      });
    }, 3000);
  };

  const canContinue = synced.canvas || synced.bcourses;

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
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1
              className="text-3xl font-bold mb-4"
              style={{ color: "#0077fe" }}
            >
              Sync Your Course Data
            </h1>
            <p className="text-lg text-gray-600">
              Import your classes and assignments from your learning management
              system
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Canvas Sync */}
            <Card className="shadow-lg border border-gray-200 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: "#FDB515", opacity: 0.2 }}
                  >
                    <Download
                      className="h-8 w-8"
                      style={{ color: "#FDB515" }}
                    />
                  </div>
                </div>
                <CardTitle className="text-xl">Canvas Integration</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">
                  Import classes, assignments, and student rosters from Canvas
                  LMS
                </p>

                {synced.canvas ? (
                  <div className="flex items-center justify-center text-green-600 mb-4">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Sync Complete</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleSync("canvas")}
                    disabled={syncing.canvas}
                    className="w-full text-white"
                    style={{ backgroundColor: "#FDB515" }}
                  >
                    {syncing.canvas ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Syncing Canvas...
                      </div>
                    ) : (
                      "Sync with Canvas"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* bCourses Sync */}
            <Card className="shadow-lg border border-gray-200 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: "#0077fe", opacity: 0.2 }}
                  >
                    <Video className="h-8 w-8" style={{ color: "#0077fe" }} />
                  </div>
                </div>
                <CardTitle className="text-xl">
                  Brightspace Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">
                  Import classes, assignments, and student rosters from
                  Brightspace
                </p>

                {synced.bcourses ? (
                  <div className="flex items-center justify-center text-green-600 mb-4">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Sync Complete</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleSync("bcourses")}
                    disabled={syncing.bcourses}
                    className="w-full text-white"
                    style={{ backgroundColor: "#0077fe" }}
                  >
                    {syncing.bcourses ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Syncing bCourses...
                      </div>
                    ) : (
                      "Sync with bCourses"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              onClick={() => navigate("/dashboard")}
              disabled={!canContinue}
              className={`px-8 py-3 text-lg font-medium ${
                canContinue
                  ? "text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              style={canContinue ? { backgroundColor: "#FDB515" } : {}}
            >
              Continue to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {!canContinue && (
              <p className="text-sm text-gray-500 mt-2">
                Please sync at least one data source to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sync;
