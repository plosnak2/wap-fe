import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SlideShow from "../Static/Carousel";
import NavigationBar from "../Static/Navbar";
import Filter from "../Static/Filter";
import { format } from 'date-fns'
import Moment from 'moment';
import Button from 'react-bootstrap/Button';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const json = [
    {
        "servicePrice": 50,
        "serviceName": "Wellness",
        "description": "Služba zahrňuje vstup do saunového sveta (fínska, infra, parná, bylinková), vírivku a 25 metrový plavecký bazén.",
        "image": "https://penzionferratask66843.zapwp.com/q:i/r:0/wp:1/w:1/u:https://penzionferrata.sk/wp-content/uploads/elementor/thumbs/wellness-penzion-ferrata-46-p8dnxlnazhf0ynkg1p1n587p7crycjebdx27qzeiog.jpg"
    },
    {
        "servicePrice": 30,
        "serviceName": "Sauna",
        "description": "Služba zahrňuje vstup do saunového sveta (fínska, infra, parná, bylinková), vírivku a 25 metrový plavecký bazén.",
        "image": "https://penzionferratask66843.zapwp.com/q:i/r:0/wp:1/w:1/u:https://penzionferrata.sk/wp-content/uploads/elementor/thumbs/wellness-penzion-ferrata-46-p8dnxlnazhf0ynkg1p1n587p7crycjebdx27qzeiog.jpg"
    }

  ]

function Reserve(props) {
    const [services, setServices] = useState([])
    const [price, setPrice] = useState(Math.round((props.endDate.setHours(0,0,0,0,) - props.startDate.setHours(0,0,0,0))/86400000) * props.room.priceForNight)
    useEffect(() => {
        let tempArr = []
        json.map((service, index) => {
            let item = {
                service: service,
                isChecked: false
            }
            tempArr.push(item)
        })
        setServices(tempArr)
      }, []);

    const handleChange = (event, index) => {
        let tempArr = [...services]
        tempArr[index].isChecked = !tempArr[index].isChecked
        console.log(tempArr)
        setServices(tempArr)
        let tempPrice = price
        if(tempArr[index].isChecked){
            tempPrice += tempArr[index].service.servicePrice * Math.round((props.endDate.setHours(0,0,0,0,) - props.startDate.setHours(0,0,0,0))/86400000)
        } else {
            tempPrice -= tempArr[index].service.servicePrice * Math.round((props.endDate.setHours(0,0,0,0,) - props.startDate.setHours(0,0,0,0))/86400000)
        }
        setPrice(tempPrice)
    };


    return (
      <div className="backgroundImageCVR">
        <div className="background-image"></div>
        <div className="reservation">
            <img src={props.room.photo} alt=''/>
            <h1>Počet lôžok: {props.room.capacity}</h1>
            <p>Číslo izby: {props.room.roomNumber}</p>
            <p>Poschodie: {props.room.floor}</p>
            <p>Popis izby: {props.room.description}</p>
            <p>Začiatok pobytu: {Moment(new Date(props.startDate)).format('DD.MM.YYYY')}</p>
            <p>Koniec pobytu: {Moment(new Date(props.endDate)).format('DD.MM.YYYY')}</p>
            <p>Cena za noc: {props.room.priceForNight}€</p>
            <h1>Služby za príplatok:</h1>
            {
                services.map((service, index) => {
                    return(
                        <div className="service">
                            <div className="roomImage">
                                <img src={service.service.image} alt=''/>
                            </div>
                            <div className="description">
                                <h3>{service.service.serviceName}</h3>
                                <p>Popis: {service.service.description}</p>
                                <p>Cena: {service.service.servicePrice}€/noc</p>
                                <p>Pridať: <Checkbox {...label} checked={service.isChecked} onChange={(event) => handleChange(event, index)}/></p>
                            </div>
                        </div>
                    )
                })
            }
            <Button variant="success">Rezervovať - {price}€</Button> 
        </div>
      </div>
    );
  }
  
export default Reserve;