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
import Collapse from 'react-bootstrap/Collapse';
import { RotatingLines } from  'react-loader-spinner'
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


function CustomerReservations() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [openServices, setOpenServices] = useState([]);
    const [loading, setLoading] = useState(true)
    const [reservations, setReservations] = useState([]);
   
    useEffect(() => {
        axios.get('https://localhost:7032/api/Reservation/byCustomer/' + localStorage.getItem("id"))
        .then((response) => {
          console.log(response);
          setReservations(response.data);
          let openServicesTmp = []
          response.data.map((service, index) => {
              let item = {
                  open: false
              }
              openServicesTmp.push(item)
          })
        setOpenServices(openServicesTmp)
        setLoading(false)
        })
        .catch((err) => {
          
        });
        
      }, [loading]);

    function handleChange(index) {
        let tmpArr = [...openServices]
        tmpArr[index].open = !tmpArr[index].open
        setOpenServices(tmpArr)
        console.log(openServices)
    }

    function storno(resId, index){
        axios.delete('https://localhost:7032/api/Reservation/' + resId)
        .then((response) => {
          console.log(response)
          setLoading(true)
        })
        .catch((err) => {
          
        });
    }

    if(loading)
    {
      return(
        <div className="spinner">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )
    }

    return (
      <div className="backgroundImageCVR">
        <div className="background-image"></div>
            <div className="customers-reservations">
            <h1>Rezervácie</h1>
            {
                reservations.map((reservation, index) => {
                    return (
                        <div className="wrapper-reservations">
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Stornovať rezerváciu?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Prajete si stornovať rezerváciu?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Zrušiť
                            </Button>
                            <Button variant="danger" onClick={() => (storno(reservation.id, index), handleClose())}>
                                Stornovať
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        <div className="customer-reservation">
                            <div className='customer-reservation-image'>
                                <img src={reservation.room.photo} className='customer-reservation-imgroom' alt=''/>
                            </div>
                            <div className="customer-reservation-info">
                                <h3>Počet lôžok: {reservation.room.capacity}</h3>
                                <p>Začiatok pobytu: {Moment(new Date(reservation.arrivalDate)).format('DD.MM.YYYY')}</p>
                                <p>Koniec pobytu:  {Moment(new Date(reservation.departureDate)).format('DD.MM.YYYY')}</p>
                                <p>Vytvorenie rezervácie:  {Moment(new Date(reservation.createdAt)).format('DD.MM.YYYY')}</p>
                                <p>Cena:  {reservation.price}€</p>
                            </div>
                            <div className="customer-reservation-info">
                                <h3>ID rezervácie: {reservation.id}</h3>
                                {
                                    reservation.status == "Created" ?
                                    <p style={{color:"orange"}}>Stav: Vytvorená</p> :
                                    reservation.status == "Confirmed" ?
                                    <p style={{color:"green"}}>Stav: Potvrdená</p> :
                                    reservation.status == "Paid" ?
                                    <p style={{color:"green"}}>Stav: Zaplatená</p> :
                                    reservation.status == "Cancelled" ?
                                    <p style={{color:"red"}}>Stav: Zrušená</p> :
                                    <p style={{color:"grey"}}>Stav: Vybavená</p>
                                }
                                {
                                    reservation.status == "Created" ||  reservation.status == "Confirmed" ||  reservation.status == "Paid" ?
                                    <Button variant="danger" className="button-reservation" onClick={handleShow}>Stornovať rezerváciu</Button> :
                                    null
                                }
                                <Button variant="dark" className="button-reservation"
                                onClick={() => handleChange(index)}
                                aria-controls="example-collapse-text"
                                aria-expanded={openServices[index].open}>
                                    Zobraziť služby
                                </Button>
                            </div>
                            
                        </div>
                        
                            {
                                reservation.services.map((service) => {
                                    return (
                                        <Collapse in={openServices[index].open}>
                                        <div id="example-collapse-text">
                                            <div className="reservation-service">
                                                <div className='reservation-service-image'>
                                                    <img src={service.image} className='reservation-service-imgroom' alt=''/>
                                                </div>
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
      </div>
    );
  }
  
export default CustomerReservations;