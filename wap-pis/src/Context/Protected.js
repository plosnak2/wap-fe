import { useState, useEffect, useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const  Protected = () => {
    const [role, setRole] = useState(localStorage.getItem("role")?localStorage.getItem("role"):null);


    return role === "customer" || role === null ?  <Outlet /> :  <Navigate to="/reservationslist"/> ;
}

  export default Protected