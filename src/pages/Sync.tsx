import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";

type LMS = "canvas" | "brightspace" | null;

const Sync = () => {
  const navigate = useNavigate();
  const [selectedLMS, setSelectedLMS] = useState<LMS>(null);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const handleSelectLMS = (lms: "canvas" | "brightspace") => {
    setSelectedLMS(lms);
    setSynced(false); // Reset sync status when switching
  };

  const handleSync = async () => {
    if (!selectedLMS) return;

    setSyncing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSyncing(false);
    setSynced(true);
  };

  const handleContinue = () => {
    navigate("/dashboard");
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
        <Navigation />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Connect Your <span style={{ color: "#0077fe" }}>LMS</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your learning management system<br></br>Sync your classes,
              assignments, and student data
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Canvas Sync */}
            <Card
              className={`transition-all duration-200 hover:shadow-lg ${
                selectedLMS === "canvas" ? "ring-2 ring-red-500" : ""
              } ${
                synced && selectedLMS !== "canvas"
                  ? "opacity-50 grayscale cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (!synced || selectedLMS === "canvas") {
                  handleSelectLMS("canvas");
                }
              }}
            >
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    selectedLMS === "canvas" ? "bg-red-100" : "bg-gray-100"
                  }`}
                >
                  <img
                    src="https://www.instructure.com/sites/default/files/image/2021-12/Canvas_logo_single_mark.png"
                    alt="Canvas Logo"
                    className="w-10 h-10"
                    style={{ filter: "brightness(1.2) saturate(1.3)" }}
                  />
                </div>
                <CardTitle className="text-xl text-center mb-2">
                  Canvas Integration
                </CardTitle>
                <p className="text-gray-600 text-center mb-4">
                  Import classes, assignments, and student rosters from Canvas
                </p>
                <div className="text-center">
                  {synced && selectedLMS === "canvas" ? (
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">
                        Synced Successfully
                      </span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className={`w-full ${
                        selectedLMS === "canvas"
                          ? "border-red-500 text-red-600 hover:bg-red-50"
                          : ""
                      }`}
                      disabled={
                        selectedLMS !== "canvas" ||
                        (synced && selectedLMS !== "canvas")
                      }
                    >
                      {selectedLMS === "canvas"
                        ? "Selected"
                        : "Click to select"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Brightspace Sync */}
            <Card
              className={`transition-all duration-200 hover:shadow-lg ${
                selectedLMS === "brightspace" ? "ring-2 ring-orange-500" : ""
              } ${
                synced && selectedLMS !== "brightspace"
                  ? "opacity-50 grayscale cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (!synced || selectedLMS === "brightspace") {
                  handleSelectLMS("brightspace");
                }
              }}
            >
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    selectedLMS === "brightspace"
                      ? "bg-orange-100"
                      : "bg-gray-100"
                  }`}
                >
                  <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">D2L</span>
                  </div>
                </div>
                <CardTitle className="text-xl text-center mb-2">
                  Brightspace Integration
                </CardTitle>
                <p className="text-gray-600 text-center mb-4">
                  Import classes, assignments, and student rosters from
                  Brightspace
                </p>
                <div className="text-center">
                  {synced && selectedLMS === "brightspace" ? (
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">
                        Synced Successfully
                      </span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className={`w-full ${
                        selectedLMS === "brightspace"
                          ? "border-orange-500 text-orange-600 hover:bg-orange-50"
                          : ""
                      }`}
                      disabled={
                        selectedLMS !== "brightspace" ||
                        (synced && selectedLMS !== "brightspace")
                      }
                    >
                      {selectedLMS === "brightspace"
                        ? "Selected"
                        : "Click to select"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sync Button */}
          {selectedLMS && !synced && (
            <div className="text-center mb-8">
              <Button
                onClick={handleSync}
                disabled={syncing}
                className="px-8 py-3 text-lg font-medium"
                style={{
                  backgroundColor:
                    selectedLMS === "canvas" ? "#FF003A" : "#E17110",
                  color: "white",
                }}
              >
                {syncing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Syncing with{" "}
                    {selectedLMS === "canvas" ? "Canvas" : "Brightspace"}...
                  </>
                ) : (
                  `Sync with ${
                    selectedLMS === "canvas" ? "Canvas" : "Brightspace"
                  }`
                )}
              </Button>
            </div>
          )}

          {/* Continue Button */}
          {synced && (
            <div className="text-center">
              <Button
                onClick={handleContinue}
                className="px-8 py-3 text-lg font-medium"
                style={{ backgroundColor: "#0077fe", color: "white" }}
              >
                Continue to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sync;
