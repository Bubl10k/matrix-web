import { Container } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function History() {
    const { user } = useContext(AuthContext);

    return ( user ? (
            <Container maxWidth="xl">
                <div>History</div>
            </Container>
        ):(
            <div>
                <p>You are not logged in, redirecting...</p>
            </div>
        )
    
    );
}