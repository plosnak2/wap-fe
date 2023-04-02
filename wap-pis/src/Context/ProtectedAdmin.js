import { useState, useEffect, useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const  ProtectedAdmin = () => {
    const [role, setRole] = useState(localStorage.getItem("role")?localStorage.getItem("role"):null);


    return role === "admin" ?  <Outlet /> :  <Navigate to="/"/> ;
}

  export default ProtectedAdmin