import { Route, Routes, Navigate } from "react-router-dom";
import Matrix from "../pages/Matrix";
import Signup from "../pages/Signup";
import History from "../pages/History";
import Error from "../pages/Error";

export default function AppRouter() {
    return (
      <Routes>
        <Route path="/matrix" element={<Matrix />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/history" element={<History />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    );
}