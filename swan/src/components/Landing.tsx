// import React from "react";
// import videoBg from "../assets/swaaa.mp4";
// import logo from "../assets/swan.png";    

// const Landing: React.FC = () => {
//   return (
//     <div className="relative h-screen w-screen overflow-hidden">
//       {/* Background Video */}
//       <video
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//         autoPlay
//         loop
//         muted
//         playsInline
//       >
//         <source src={videoBg} type="video/mp4" />
//       </video>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/50 z-10" />

//       {/* Logo */}
//       <div className="absolute top-6 left-6 z-20 b">
//         <img src={logo} alt="SWANAIR Logo" className="h-12 w-auto" />
//       </div>

//       {/* Centered Content */}
//       <div className="absolute inset-0 z-20 grid place-items-center text-white text-center px-4">
//         <div>
//           <h1 className="text-5xl md:text-6xl font-bold mb-4">
//             SWANAIR TRAVELS & SAFARIS
//           </h1>
//           <p className="text-5xl md:text-6xl font-bold mb-4">COSTING SOFTWARE</p>
//           <button className="bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition">
//             Get Started
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Landing;


// src/components/LandingPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import videoBg from "../assets/swaaa.mp4";
import logo from "../assets/swan.png";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <img src={logo} alt="SWANAIR Logo" className="h-12 w-auto" />
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 z-20 grid place-items-center text-white text-center px-4">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            SWANAIR TRAVELS & SAFARIS
          </h1>
          <p className="text-xl md:text-2xl mb-6">COSTING SOFTWARE</p>
          <button
            className="bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;




