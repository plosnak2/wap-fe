import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SlideShow from "../Static/Carousel";
import NavigationBar from "../Static/Navbar";

function Main() {


    return (
      <div>
        <NavigationBar />
        <SlideShow />
        Ahojte
      </div>
    );
  }
  
export default Main;