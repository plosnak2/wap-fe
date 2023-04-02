import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SlideShow from "../../Static/Carousel";
import NavigationBar from "../../Static/Navbar";
import Filter from "../../Static/Filter";
import EmployeeReservations from "../../Static/EmployeeReservations";
import Rooms from "../../Static/Rooms";

function RoomsInfo() {
    return (
      <div>
        <NavigationBar />
        <SlideShow />
        <Rooms />
      </div>
    );
  }
  
export default RoomsInfo;