import { useState, useEffect, useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const  ProtectedCustomer = () => {
    const [role, setRole] = useState(localStorage.getItem("role")?localStorage.getItem("role"):null);


    return role === "customer" ?  <Outlet /> :  <Navigate to="/"/> ;
}

  export default ProtectedCustomer