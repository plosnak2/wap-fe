import { useState, useEffect, useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const  ProtectedEmployeeAdmin = () => {
    const [role, setRole] = useState(localStorage.getItem("role")?localStorage.getItem("role"):null);


    return role === "employee" || role === "admin" ?  <Outlet /> :  <Navigate to="/"/> ;
}

  export default ProtectedEmployeeAdmin