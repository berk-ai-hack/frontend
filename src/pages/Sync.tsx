import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Download, Video, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Sync = () => {
  const [syncing, setSyncing] = useState({ canvas: false, bcourses: false });
  const [synced, setSynced] = useState({ canvas: false, bcourses: false });
  const navigate = useNavigate();

  const handleSync = (type: 'canvas' | 'bcourses') => {
    setSyncing(prev => ({ ...prev, [type]: true }));
    
    setTimeout(() => {
      setSyncing(prev => ({ ...prev, [type]: false }));
      setSynced(prev => ({ ...prev, [type]: true }));
      toast({
        title: `${type === 'canvas' ? 'Canvas' : 'bCourses'} Sync Complete`,
        description: "Your data has been successfully imported.",
      });
    }, 3000);
  };

  const canContinue = synced.canvas || synced.bcourses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Teacher's Pet</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sync Your Course Data
          </h1>
          <p className="text-lg text-gray-600">
            Import your classes and assignments from your learning management system
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Canvas Sync */}
          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Download className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <CardTitle className="text-xl">Canvas Integration</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Import classes, assignments, and student rosters from Canvas LMS
              </p>
              
              {synced.canvas ? (
                <div className="flex items-center justify-center text-green-600 mb-4">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Sync Complete</span>
                </div>
              ) : (
                <Button
                  onClick={() => handleSync('canvas')}
                  disabled={syncing.canvas}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
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
          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Video className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-xl">Brightspace Integration</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Import classes, assignments, and student rosters from Brightspace
              </p>
              
              {synced.bcourses ? (
                <div className="flex items-center justify-center text-green-600 mb-4">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Sync Complete</span>
                </div>
              ) : (
                <Button
                  onClick={() => handleSync('bcourses')}
                  disabled={syncing.bcourses}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
            onClick={() => navigate('/dashboard')}
            disabled={!canContinue}
            className={`px-8 py-3 text-lg font-medium ${
              canContinue 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
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
  );
};

export default Sync;
