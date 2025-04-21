import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AppLayout from "./AppLayout";
import { useAuthStore } from "./store/useAuthStore";
import { Spinner } from "./components/ui/Spinner";

const App = () => {
  const { user, hasCheckedAuth, isLoading, checkUserStatus } = useAuthStore();

  useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  if (!hasCheckedAuth || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={user ? <Navigate to="/" replace /> : <AuthPage />}
        />
        <Route
          path="/*"
          element={user ? <AppLayout /> : <Navigate to="/auth" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
