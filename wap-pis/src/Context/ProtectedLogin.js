import { useState, useEffect, useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const  ProtectedLogin = () => {
    const [role, setRole] = useState(localStorage.getItem("role")?true:null);


    return role ? <Navigate to="/"/> :  <Outlet />  ;
}

  export default ProtectedLogin