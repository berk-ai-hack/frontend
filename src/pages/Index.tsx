
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Streamline Your Grading Process
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered grading platform for educators. Sync with Canvas, provide voice feedback, and grade efficiently.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sync with Canvas</h3>
              <p className="text-gray-600">Import classes and assignments automatically</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI Feedback</h3>
              <p className="text-gray-600">Generate intelligent grading suggestions</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Voice Recording</h3>
              <p className="text-gray-600">Add personalized audio feedback</p>
            </CardContent>
          </Card>
        </div>

        {/* Login Section */}
        <Card className="max-w-md mx-auto shadow-xl border-0">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started</h2>
              <p className="text-gray-600 mb-8">
                Ready to transform your grading experience?
              </p>
              
              <Button 
                onClick={() => navigate('/login')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
              >
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
