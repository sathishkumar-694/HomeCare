import React, { useState, useEffect } from "react";
import { Sparkles, Users, Shield, Zap } from "lucide-react";

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: Users, text: "Trusted Providers", color: "text-blue-500" },
    { icon: Shield, text: "Secure Platform", color: "text-green-500" },
    { icon: Zap, text: "Quick Onboarding", color: "text-yellow-500" }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{
            top: '10%',
            left: '10%',
            animation: 'blob 7s infinite'
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{
            top: '50%',
            right: '10%',
            animation: 'blob 7s infinite 2s'
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{
            bottom: '10%',
            left: '50%',
            animation: 'blob 7s infinite 4s'
          }}
        />
      </div>

      {/* Floating cursor effect */}
      <div 
        className="absolute w-4 h-4 bg-blue-500 rounded-full pointer-events-none mix-blend-multiply filter blur-sm opacity-30 transition-all duration-150"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8
        }}
      />

      {/* Main content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Floating sparkle icon */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="relative">
            <Sparkles className="w-16 h-16 text-purple-600 animate-pulse" />
            <div className="absolute inset-0 w-16 h-16 bg-purple-400 rounded-full filter blur-xl opacity-50 animate-ping" />
          </div>
        </div>

        {/* Title with gradient animation */}
        <h1 className={`text-6xl md:text-7xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform transition-all duration-1000 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Welcome to HomeCare
        </h1>

        {/* Subtitle */}
        <p className={`text-gray-700 text-lg mb-12 text-center max-w-2xl leading-relaxed transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Find trusted service providers or offer your services. Quick onboarding,
          role selection, and simple workflows for a seamless experience.
        </p>

        {/* Feature badges with hover effects */}
        <div className={`flex flex-wrap gap-4 mb-12 justify-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default"
            >
              <feature.icon className={`w-5 h-5 ${feature.color}`} />
              <span className="text-sm font-medium text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons with gradient hover effects */}
        <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <a
            href="/signup"
            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden text-center"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          
          <a
            href="/role-selection"
            className="group bg-white/80 backdrop-blur-sm border-2 border-purple-300 text-purple-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:bg-white hover:border-purple-500 transform hover:scale-105 transition-all duration-300 text-center"
          >
            <span>Choose Role</span>
          </a>
        </div>

        {/* Decorative animated shapes */}
        <div className="absolute bottom-10 left-10 w-20 h-20 border-4 border-blue-300 rounded-full opacity-20" style={{ animation: 'spin-slow 20s linear infinite' }} />
        <div className="absolute top-20 right-20 w-16 h-16 border-4 border-purple-300 rounded-lg animate-bounce opacity-20" />
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}

export default Home;