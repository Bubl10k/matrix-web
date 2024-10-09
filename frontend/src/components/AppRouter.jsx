import { Route, Routes, Navigate } from "react-router-dom";
import Matrix from "../pages/Matrix";
import Signup from "../pages/Signup";
import History from "../pages/History";
import Error from "../pages/Error";
import Login from "../pages/Login";
import PrivateRoute from "../utils/PrivateRoute";

export default function AppRouter() {
    return (
      <Routes>
        <Route path="/matrix" element={<PrivateRoute><Matrix /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
        <Route path="/error" element={<Error />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    );
}