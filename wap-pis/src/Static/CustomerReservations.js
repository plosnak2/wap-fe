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


const json = [
    {
      "reservationID": "15038",
      "arrivalDate": "2023-03-29T13:33:19.317Z",
      "departureDate": "2023-03-29T13:33:19.317Z",
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
      }
    },
    {
      "reservationID": "15038",
      "arrivalDate": "2023-03-29T13:33:19.317Z",
      "departureDate": "2023-03-29T13:33:19.317Z",
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
      }
    }
  ]

function CustomerReservations() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [openServices, setOpenServices] = useState([]);
    const [loading, setLoading] = useState(true)
    // TODO -> tu je potrebné odchytit z be vsetky rezervácie viazane na tohto zakaznika (neviem v akom formate to BE posle ale nejaky provizorny je vyššie v jsone)
    useEffect(() => {
        let openServicesTmp = []
        json.map((service, index) => {
            let item = {
                open: false
            }
            openServicesTmp.push(item)
        })
        setOpenServices(openServicesTmp)
        setLoading(false)
      }, []);

    function handleChange(index) {
        let tmpArr = [...openServices]
        tmpArr[index].open = !tmpArr[index].open
        setOpenServices(tmpArr)
        console.log(openServices)
    }

    // TODO dokončit funkcionalitu aby sa rezervacia stornovala z BE (vymazala) a presmerovanie (keď tak)
    function storno(resId, index){
        console.log("stornujem res: ", resId)
        console.log("index pola: ", index)
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
                json.map((reservation, index) => {
                    return (
                        <div className="wrapper-reservations">
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Stornovať rezerváciu?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Prajete si stornovať rezerváciu {reservation.reservationID}</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Zrušiť
                            </Button>
                            <Button variant="danger" onClick={() => storno(reservation.reservationID, index)}>
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
                                <h3>ID rezervácie: {reservation.reservationID}</h3>
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