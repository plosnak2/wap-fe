import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import NavigationBar from "../Static/Navbar";
import Register from "../Static/Register";

function RegisterPage() {


    return (
      <div>
        <NavigationBar />
        <Register />
      </div>
    );
  }
  
export default RegisterPage;