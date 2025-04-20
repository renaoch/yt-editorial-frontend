// import React, { useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import AuthPage from "./pages/AuthPage";
// import AppLayout from "./AppLayout";
// import { useAuthStore } from "./store/useAuthStore"; // Import Zustand store
// import { Spinner } from "./components/ui/Spinner";

// const App = () => {
//   const { checkUserStatus, isLoading, user, hasCheckedAuth } = useAuthStore();

//   // Run checkUserStatus once when the component mounts
//   // useEffect(() => {
//   //   checkUserStatus();
//   // }, [checkUserStatus]);

//   // Show loading state until the user status has been checked
//   if (isLoading || !hasCheckedAuth) {
//     return (
//       <div className="flex justify-center items-center min-h-[100svh]">
//         <Spinner />
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/auth" element={<AuthPage />} />

//         <Route
//           path="/*"
//           element={
//             user ? (
//               <AppLayout user={user} /> // Pass the user to AppLayout
//             ) : (
//               <Navigate to="/auth" replace />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AppLayout from "./AppLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
};

export default App;

