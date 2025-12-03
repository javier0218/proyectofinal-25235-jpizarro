import { Children } from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export default function RutaProtegida({children})
{
    const auth= useAuth();
    return auth ? children: <Navigate to="/login" />  
}