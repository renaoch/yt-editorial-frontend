// import React, { useState } from "react";
// import { LoginForm } from "../components/auth/LoginForm";
// import { SignupForm } from "../components/auth/SignupForm";
// import VantaBackground from "../components/ui/VantaBG";

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleForm = () => setIsLogin(!isLogin);

//   return (
//     <div>
//       <VantaBackground />
//       <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
//         {/* Show the form based on isLogin state */}
//         {isLogin ? (
//           <LoginForm onToggleAuthForm={toggleForm} />
//         ) : (
//           <SignupForm onToggleAuthForm={toggleForm} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

import React from "react";

const AuthPage = () => {
  const handleLoginAsCreator = () => {
    // Redirect to Google OAuth for creator role
    window.location.href = "http://localhost:8080/auth/google/creator";
  };

  const handleLoginAsEditor = () => {
    // Redirect to Google OAuth for editor role
    window.location.href = "http://localhost:8080/auth/google/editor";
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-semibold mb-4 text-gray-700">
        Login to Your Account
      </h1>
      <p className="text-lg mb-8 text-gray-500">
        Choose your role to get started
      </p>
      <div className="flex gap-6">
        <button
          className="px-8 py-3 text-white bg-green-500 rounded-lg text-xl font-semibold shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          onClick={handleLoginAsCreator}
        >
          Login as Creator
        </button>
        <button
          className="px-8 py-3 text-white bg-blue-500 rounded-lg text-xl font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          onClick={handleLoginAsEditor}
        >
          Login as Editor
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
