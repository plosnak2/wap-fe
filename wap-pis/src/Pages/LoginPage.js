import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import NavigationBar from "../Static/Navbar";
import Login from "../Static/Login";

function LoginPage() {


    return (
      <div>
        <NavigationBar />
        <Login />
      </div>
    );
  }
  
export default LoginPage;