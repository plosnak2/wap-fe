import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SlideShow from "../Static/Carousel";
import NavigationBar from "../Static/Navbar";
import Filter from "../Static/Filter";
import { format } from 'date-fns'
import Moment from 'moment';
import Button from 'react-bootstrap/Button';
import Checkbox from '@mui/material/Checkbox';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { BsBank, BsCash} from 'react-icons/bs';
import axios from "axios";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Reserve(props) {
    const navigate = useNavigate();
    const [services, setServices] = useState([])
    const [price, setPrice] = useState(Math.round((props.endDate.setHours(0,0,0,0,) - props.startDate.setHours(0,0,0,0))/86400000) * props.room.priceForNight)
    const [payment, setPayment] = useState(1);

    useEffect(() => {
        axios.get('https://localhost:7032/api/Service')
        .then((response) => {
            console.log(response);
            let tempArr = []
            response.data.map((service, index) => {
                let item = {
                    service: service,
                    isChecked: false
                }
                tempArr.push(item)
            })
            setServices(tempArr)
        })
        .catch((err) => {
            
        });
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

    const getServicesIds = (ids) => {
        ids = []
        services.map((element) => {
            if(element.isChecked == true){
                ids.push(element.service.id)
            }
        })
        return ids;
    }

    const makeReservation = () => {
        let ids = getServicesIds()
        let status;
        let paymentMethod;
        if(payment == 1){
            status = "Paid";
            paymentMethod = "Bank";
        }
        if(payment == 2){
            status = "Created";
            paymentMethod = "Cash";
        }
        const reservationInput = {
            "customerId": localStorage.getItem("id"),
            "arrivalDate": new Date(props.startDate),
            "departureDate": new Date(props.endDate),
            "price": price,
            "status": status,
            "createdAt": new Date(),
            "paymentMethod": paymentMethod,
            "services": ids,
            "roomNumber": props.room.roomNumber
        }
        console.log(reservationInput)
        axios.post('https://localhost:7032/api/Reservation', reservationInput)
        .then((response) => {
            console.log(response);
            navigate("/myreservations", { replace: true })
        })
        .catch((err) => {
            
        });
    }


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
            <h1>Spôsob platby</h1>
            <RadioGroup
                row
                className='payment-method'
                value={payment}
                name="radio-buttons-group"
                onChange={(e)=> setPayment(e.target.value)}   
            >   
                <div className="payment-method-block">
                    <FormControlLabel value={1} control={<Radio />} label="Prevodom" /> <BsBank size={30}/>
                </div>
                <div className="payment-method-block">
                    <FormControlLabel value={2} control={<Radio />} label="Hotovosť" /> <BsCash size={30}/>
                </div>
            </RadioGroup>
            {/* TODO dorobit funkcionalitu tohto buttonu pre rezerváciu (aby sa vytvorila rezervacia na BE, uložila do db so všetkými potrebnými info) a presmerovať potom asi do reservationslist*/}
            <Button variant="success" onClick={() => makeReservation()}>Rezervovať - {price}€</Button> 
        </div>
      </div>
    );
  }
  
export default Reserve;