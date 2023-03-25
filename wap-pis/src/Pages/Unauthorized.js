import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

function Unauthorized() {
    const navigate = useNavigate();

    function login(){
        localStorage.setItem("role", "manager");
        navigate("/", { replace: true });
    }

    return (
      <div onClick={()=> login()}>
        Na túto stránku nemáte prístup
      </div>
    );
  }
  
export default Unauthorized;