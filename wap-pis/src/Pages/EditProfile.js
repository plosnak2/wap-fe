import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import NavigationBar from "../Static/Navbar";
import Register from "../Static/Register";
import Edit from "../Static/Edit";

function EditProfile() {
    return (
      <div>
        <NavigationBar />
        <Edit />
      </div>
    );
  }
  
export default EditProfile;