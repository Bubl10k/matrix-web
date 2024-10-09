import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

export default function PrivateRoute({ children, ...rest }) {
    let user = useContext(AuthContext);
    
    return !user ? <Navigate to='/login'/> : children;
}