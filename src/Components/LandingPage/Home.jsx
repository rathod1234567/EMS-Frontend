import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const features = [
  {
    title: "Employee Directory",
    description: "Centralized employee database with detailed profiles and documentation",
    icon: "👤",
  },
  {
    title: "Time Tracking",
    description: "Advanced time tracking with attendance management and leave requests",
    icon: "📅",
  },
  {
    title: "Salary Tracking",
    description: "Advanced salary management and leave requests",
    icon: "💰",
  },
  {
    title: "Department Management",
    description: "Organize teams and departments with hierarchical structure",
    icon: "🏢",
  },
];

function Home() {
  const navigate = useNavigate();
  
  return (
    <>
      <Navbar />
      
      <div className="font-sans text-gray-800">

        <section className="bg-blue-600 text-white px-4 sm:px-6 pt-24 pb-10 sm:pt-28 sm:pb-12">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 lg:gap-16">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
                  Streamline Your Workforce Management
                </h1>
                <p className="mb-5 sm:mb-6 text-sm sm:text-base">
                  Simplify employee management with our comprehensive solution. Track time, manage performance, and boost productivity.
                </p>
                <button 
                  className="bg-white text-blue-600 font-semibold px-5 py-2 rounded hover:bg-gray-100 transition"
                  onClick={() => navigate("/login")}
                >
                  Get Started →
                </button>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c"
                  alt="Workforce Management"
                  className="w-full max-w-md rounded shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </section>

      
        <section className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50 text-center">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Powerful Features for Modern Workplaces
            </h2>
            <p className="text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base">
              Everything you need to manage your workforce effectively in one integrated platform
            </p>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
              {features.map((feature, index) => (
                <div key={index} className="bg-white text-center rounded-xl shadow-md p-4 sm:p-6 text-left h-full">
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

       
        <section className="bg-gray-900 text-white text-center py-12 sm:py-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Transform Your Workplace?</h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base">Join thousands of companies that trust our platform for their employee management needs</p>
            <button 
              className="bg-blue-600 hover:bg-blue-500 px-5 sm:px-6 py-2 sm:py-3 rounded font-semibold text-sm sm:text-base"
              onClick={() => navigate("/login")}
            >
              Start Free Trial
            </button>
          </div>
        </section>

       
        <footer className="bg-gray-100 text-center py-4 text-gray-500 text-xs sm:text-sm">
          © 2025 Employee Management System. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default Home;