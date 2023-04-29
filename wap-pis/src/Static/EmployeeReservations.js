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
import Collapse from 'react-bootstrap/Collapse';
import axios from "axios";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function EmployeeReservations() {
  const [openServices, setOpenServices] = useState([]);
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://localhost:7032/api/Reservation')
    .then((response) => {
          console.log(response);
          let openServicesTmp = []
          response.data.map((service, index) => {
              let item = {
                  open: false
              }
              openServicesTmp.push(item)
          })
          setOpenServices(openServicesTmp)
          filtering(response.data);
    })
    .catch((err) => {
          
    });
  }, [checkCreated, checkPaid, checkDone, resId, personName]);

  function filtering(reservations){
    console.log("filtrujem")
    let tmpArray = []
    reservations.map(reservation => {        
        let add = true;
        if(!((checkCreated && reservation.status == "Created") || (checkPaid && reservation.status === "Paid") || (checkDone && reservation.status === "Done"))){
            add = false
        }
      
        if(!reservation.id.toString().includes(resId))
        {
            add = false
        }
        
        if(!reservation.customer.lastName.toLowerCase().includes(personName.toLowerCase()))
        {
            add = false
        }

        if(add)
        {
            tmpArray.push(reservation)
        }
    })
    setDisplayedReservations(tmpArray)
    setLoading(false)
  }

  function handleChange(index) {
      let tmpArr = [...openServices]
      tmpArr[index].open = !tmpArr[index].open
      setOpenServices(tmpArr)
      console.log(openServices)
  }

  function checkinGuests(index){
    navigate('/checkinguests', {state: {reservation: displayedReservations[index]}})
  }

  return loading ? (<div>Loading</div>) : (
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
                            <h3>Číslo rezervácie: {reservation.id}</h3>
                            <p>Začiatok pobytu: {Moment(new Date(reservation.arrivalDate)).format('DD.MM.YYYY')}</p>
                            <p>Koniec pobytu: {Moment(new Date(reservation.departureDate)).format('DD.MM.YYYY')}</p>
                            <p>Počet nocí: {Math.round((new Date(reservation.departureDate).setHours(0,0,0,0,) - new Date(reservation.arrivalDate).setHours(0,0,0,0,))/86400000)}</p>
                            <p>Číslo izby: {reservation.room.roomNumber}</p>
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
                                <Button variant="success" onClick={() => checkinGuests(index)}>Ubytovať hostí</Button> :
                                null
                            }
                            <Button variant="dark" onClick={() => handleChange(index)}>Zobraziť služby</Button>
                        </div>
                        {
                          reservation.services.map((service) => {
                              return (
                                  <Collapse in={openServices[index].open}>
                                  <div id="example-collapse-text">
                                      <div className="reservation-service">
                                          <div className="reservation-service-info">
                                          <h3>{service.serviceName}</h3>
                                          <p>{service.description}</p>
                                          </div>
                                      </div>
                                  </div>
                                  </Collapse>
                              )     
                          })
                      }
                    </div>
                )
            })
        }
        
    </div>
  );
}

export default EmployeeReservations;