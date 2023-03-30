import Table from 'react-bootstrap/Table';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect, useContext, forwardRef } from "react";
import { format } from 'date-fns'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { FaCalendar, FaBed, FaFileInvoice  } from 'react-icons/fa';
import { BiSad } from 'react-icons/bi';
import { BsCheckSquareFill, BsFillPersonFill, BsXSquareFill } from 'react-icons/bs';
import {Navigate, useNavigate } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';
import Moment from 'moment';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const json = [
    {
      "reservationID": "15038",
      "arrivalDate": "2023-03-29T13:33:19.317Z",
      "departureDate": "2023-03-30T13:33:19.317Z",
      "price": 1000,
      "status": "Paid",
      "createdAt": "2023-03-29T13:33:19.317Z",
      "paymentMethod": "Bank",
      "services": [
        {
          "serviceName": "Wellness",
          "description": "Služba zahrňuje vstup do saunového sveta (fínska, infra, parná, bylinková), vírivku a 25 metrový plavecký bazén.",
          "image": "https://penzionferratask66843.zapwp.com/q:i/r:0/wp:1/w:1/u:https://penzionferrata.sk/wp-content/uploads/elementor/thumbs/wellness-penzion-ferrata-46-p8dnxlnazhf0ynkg1p1n587p7crycjebdx27qzeiog.jpg"
        },
        {
            "serviceName": "Wellness",
            "description": "Služba zahrňuje vstup do saunového sveta (fínska, infra, parná, bylinková), vírivku a 25 metrový plavecký bazén.",
            "image": "https://penzionferratask66843.zapwp.com/q:i/r:0/wp:1/w:1/u:https://penzionferrata.sk/wp-content/uploads/elementor/thumbs/wellness-penzion-ferrata-46-p8dnxlnazhf0ynkg1p1n587p7crycjebdx27qzeiog.jpg"
          }
      ],
      "room": {
        "roomNumber": 212,
        "capacity": 2,
        "photo": "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg"
      },
      "customer": {
        "customerFirstName": "Lojzo",
        "customerLastName": "Hlina",
      }
    },
    {
      "reservationID": "15038",
      "arrivalDate": "2023-03-29T13:33:19.317Z",
      "departureDate": "2023-03-30T13:33:19.317Z",
      "price": 1000,
      "status": "Created",
      "createdAt": "2023-03-29T13:33:19.317Z",
      "paymentMethod": "Bank",
      "services": [
        {
          "serviceName": "Wellness",
          "description": "Služba zahrňuje vstup do saunového sveta (fínska, infra, parná, bylinková), vírivku a 25 metrový plavecký bazén.",
          "image": "https://penzionferratask66843.zapwp.com/q:i/r:0/wp:1/w:1/u:https://penzionferrata.sk/wp-content/uploads/elementor/thumbs/wellness-penzion-ferrata-46-p8dnxlnazhf0ynkg1p1n587p7crycjebdx27qzeiog.jpg"
        },
        {
            "serviceName": "Wellness",
            "description": "Služba zahrňuje vstup do saunového sveta (fínska, infra, parná, bylinková), vírivku a 25 metrový plavecký bazén.",
            "image": "https://penzionferratask66843.zapwp.com/q:i/r:0/wp:1/w:1/u:https://penzionferrata.sk/wp-content/uploads/elementor/thumbs/wellness-penzion-ferrata-46-p8dnxlnazhf0ynkg1p1n587p7crycjebdx27qzeiog.jpg"
          }
      ],
      "room": {
        "roomNumber": 212,
        "capacity": 2,
        "photo": "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg"
      },
      "customer": {
        "customerFirstName": "Lojzo",
        "customerLastName": "Hlina",
      }
    }
  ]

function EmployeeReservations() {
  const [displayedReservations, setDisplayedReservations] = useState([])
  const [resId, setResId] = useState('')
  const [personName, setPersonName] = useState('')
  const [checkCreated, setCheckCreated] = useState(true)
  const [checkPaid, setCheckPaid] = useState(true)
  const [checkDone, setCheckDone] = useState(false)
  const navigate = useNavigate();
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <Button className="button" onClick={onClick} ref={ref}>
        {value}
      </Button>
    ));

  useEffect(() => {
    filtering();
  }, [checkCreated, checkPaid, checkDone, resId, personName]);

  function filtering(){
    console.log("filtrujem")
    let tmpArray = []
    json.map(reservation => {
        let add = true;
        if(!((checkCreated && reservation.status === "Created") || (checkPaid && reservation.status === "Paid") || (checkDone && reservation.status === "Done"))){
            add = false
        }

        if(!reservation.reservationID.includes(resId))
        {
            add = false
        }
        
        if(!reservation.customer.customerLastName.toLowerCase().includes(personName.toLowerCase()))
        {
            add = false
        }

        if(add)
        {
            tmpArray.push(reservation)
        }
    })
    setDisplayedReservations(tmpArray)
  }

  return (
    <div class="container">
        <div className='filter'>
            <div className='prichod'>
            <h4> <FaFileInvoice  /> Číslo rezervácie:</h4>
                <Form.Control
                    type="text"
                    className='input-reserve'
                    value={resId}
                    onChange={(e) => setResId(e.target.value)}
                />
            </div>
            <div className='odchod'>
            <h4> <BsFillPersonFill  size={30}/> Priezvisko osoby:</h4>
                <Form.Control
                    type="text"
                    className='input-reserve'
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                />
            </div>
            <div className='izby'>
            <h4> <BsCheckSquareFill  /> Stav rezervácie</h4>
            Vytvorená: <Checkbox {...label} className="check" checked={checkCreated} onChange={() => setCheckCreated(!checkCreated)}/>
            Zaplatená: <Checkbox {...label}  className="check" checked={checkPaid} onChange={() => setCheckPaid(!checkPaid)}/>
            Vybavená: <Checkbox {...label}  className="check" checked={checkDone} onChange={() => setCheckDone(!checkDone)} />
            </div>
        </div>
        {
            displayedReservations.map((reservation, index) => {
                return (
                    <div className='reservation-employee'>
                        <div className='reservation-employee-image'>
                            <img src={reservation.room.photo} className='reservation-employee-imgroom' alt=''/>
                        </div>
                        <div className='reservation-employee-info'>
                            <h3>Číslo rezervácie: {reservation.reservationID}</h3>
                            <p>Začiatok pobytu: {Moment(new Date(reservation.arrivalDate)).format('DD.MM.YYYY')}</p>
                            <p>Koniec pobytu: {Moment(new Date(reservation.departureDate)).format('DD.MM.YYYY')}</p>
                            <p>Počet nocí: {Math.round((new Date(reservation.departureDate).setHours(0,0,0,0,) - new Date(reservation.arrivalDate).setHours(0,0,0,0,))/86400000)}</p>
                        </div>
                        <div className='reservation-employee-info'>
                            <h3>Meno osoby: {reservation.customer.customerFirstName} {reservation.customer.customerLastName}</h3>
                            <p>Vytvorenie rezervácie: {Moment(new Date(reservation.createdAt)).format('DD.MM.YYYY')}</p>
                            <p>Cena pobytu: {reservation.price}€</p>
                            <p>Zaplatená: 
                            {
                                reservation.status === 'Paid' ?
                                <BsCheckSquareFill  color='green' size={22} style={{marginLeft:"5px"}}/> :
                                <BsXSquareFill  color='red'  size={22} style={{marginLeft:"5px"}}/>
                            }
                            </p>
                        </div>
                        <div className='reservation-employee-finish'>
                            {
                                reservation.status === 'Paid' ?
                                <h3>Stav: Zaplatená</h3> :
                                reservation.status === 'Created' ?
                                <h3>Stav: Vytvorená</h3> :
                                <h3>Stav: Vyriadená</h3>
                            }
                            {
                                reservation.status !== 'Done' ?
                                <Button variant="success">Ubytovať hostí</Button> :
                                null
                            } 
                        </div>
                    </div>
                )
            })
        }
        
    </div>
  );
}

export default EmployeeReservations;