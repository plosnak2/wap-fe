import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SlideShow from "../Static/Carousel";
import NavigationBar from "../Static/Navbar";
import Filter from "../Static/Filter";
import Reserve from "../Static/Reserve";

function CreateReservation({ route }) {
    const params = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if(params.state === null)
        {
            navigate('/')
        }
      }, []);

    
    return (
      <div>
        <NavigationBar />
        <Reserve room={params.state.room} startDate={params.state.startDate} endDate={params.state.endDate}/>
      </div>
    );
  }
  
export default CreateReservation;