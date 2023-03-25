import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SlideShow from "../Static/Carousel";
import NavigationBar from "../Static/Navbar";
import Filter from "../Static/Filter";

function Main() {


    return (
      <div>
        <NavigationBar />
        <SlideShow />
        <Filter />
      </div>
    );
  }
  
export default Main;