import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const About = () => {
  const navigate = useNavigate();

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

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1
              className="text-5xl font-bold mb-6"
              style={{ color: "#0077fe" }}
            >
              Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're students who've dealt with both the pain of grading, and
              being graded. <br></br>We're here to make it easier from here on
              out, cheers!
            </p>
          </div>

          {/* Team Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {/* Lavanya Sharma */}
            <div className="text-center">
              <img
                src="/lavanya.jpg"
                alt="Lavanya Sharma"
                className="w-32 h-32 rounded-xl object-cover mx-auto mb-6"
              />
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0077fe" }}
              >
                Lavanya Sharma
              </h3>
              <p className="text-gray-500">AM + Physics @ Berkeley</p>
            </div>

            {/* Harsh Dadhich */}
            <div className="text-center">
              <img
                src="/harsh.jpg"
                alt="Harsh Dadhich"
                className="w-32 h-32 rounded-xl object-cover mx-auto mb-6"
              />
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0077fe" }}
              >
                Harsh Dadhich
              </h3>
              <p className="text-gray-500">MEng DS @ UCLA</p>
            </div>

            {/* Vighanesh Sharma */}
            <div className="text-center">
              <img
                src="/vig.jpg"
                alt="Vighanesh Sharma"
                className="w-32 h-32 rounded-xl object-cover mx-auto mb-6"
              />
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0077fe" }}
              >
                Vighanesh Sharma
              </h3>
              <p className="text-gray-500">MS CS @ UT Dallas</p>
            </div>

            {/* Nikhil Hooda */}
            <div className="text-center">
              <img
                src="/nik.jpg"
                alt="Nikhil Hooda"
                className="w-32 h-32 rounded-xl object-cover mx-auto mb-6"
              />
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0077fe" }}
              >
                Nikhil Hooda
              </h3>
              <p className="text-gray-500">CS @ UWaterloo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
