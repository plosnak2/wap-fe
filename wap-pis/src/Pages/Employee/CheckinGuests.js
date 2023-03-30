import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SlideShow from "../../Static/Carousel";
import NavigationBar from "../../Static/Navbar";
import Filter from "../../Static/Filter";
import EmployeeReservations from "../../Static/EmployeeReservations";
import CheckIn from "../../Static/CheckIn";
import { RotatingLines } from  'react-loader-spinner'

function CheckinGuests() {
    const params = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      if(params.state === null)
      {
          navigate('/', {replace: true})
      } else {
          setLoading(false)
      }
    }, []);

    if(loading)
    {
      return(
        <div>
        <NavigationBar />
        <div className="spinner">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      </div>
      )
    }

    return (
      <div>
        <NavigationBar />
        <CheckIn />
      </div>
    );
  }
  
export default CheckinGuests;