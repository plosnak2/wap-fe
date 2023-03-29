import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import NavigationBar from "../Static/Navbar";
import Login from "../Static/Login";
import CustomerReservations from "../Static/CustomerReservations";

function MyReservations() {
    return (
      <div>
        <NavigationBar />
        <CustomerReservations />
      </div>
    );
  }
  
export default MyReservations;