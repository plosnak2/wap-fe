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
import Modal from 'react-bootstrap/Modal';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const json = [
    {
      "guestName": "Pavol",
      "guestLastName": "Bomber",
      "accomodated": true,
      "room": {
        "roomNumber": 212
      },
      "reservation": {
        "arrivalDate": "2023-04-01T09:36:45.561Z",
        "departureDate": "2023-04-01T09:36:45.561Z"
      }
    }
  ]

function GuestList() {
    const [roomNumber, setRoomNumber] = useState('')
    const [personName, setPersonName] = useState('')
    const [checkAccomodated, setCheckAccomodated] = useState(true)
    const [checkNotAccomodated, setCheckNotAccomodated] = useState(false)
    const [displayedGuests, setDisplayedGuests] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // TODO odhchytit info o aktualne ubytovaných hostoch z BE 
    useEffect(() => {
        filtering();
    }, [roomNumber, personName, checkAccomodated, checkNotAccomodated]);
    
    function filtering(){
        let tmpArray = []
        json.map(guest => {
            let add = true;
            if(!((checkAccomodated && guest.accomodated) || (checkNotAccomodated && !guest.accomodated))){
                add = false
            }
    
            if(!guest.room.roomNumber.toString().includes(roomNumber))
            {
                add = false
            }
            
            if(!guest.guestLastName.toLowerCase().includes(personName.toLowerCase()))
            {
                add = false
            }
    
            if(add)
            {
                tmpArray.push(guest)
            }
        })
        setDisplayedGuests(tmpArray)
      }

    function checkout(index){
        // TODO -> dorobit odubytovanie hosta - poslat dotaz na BE
    }

    return (
        <div class="container">
        <div className='filter'>
            <div className='prichod'>
            <h4> <FaFileInvoice  /> Číslo izby:</h4>
                <Form.Control
                    type="text"
                    className='input-reserve'
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                />
            </div>
            <div className='odchod'>
            <h4> <BsFillPersonFill  size={30}/> Priezvisko hosťa:</h4>
                <Form.Control
                    type="text"
                    className='input-reserve'
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                />
            </div>
            <div className='izby'>
            <h4> <BsCheckSquareFill  /> Stav hosťa</h4>
                Ubytovaný: <Checkbox {...label} className="check" checked={checkAccomodated} onChange={() => setCheckAccomodated(!checkAccomodated)}/>
                Neubytovaný: <Checkbox {...label}  className="check" checked={checkNotAccomodated} onChange={() => setCheckNotAccomodated(!checkNotAccomodated)}/>
            </div>
        </div>

        <Table striped bordered hover size="sm" variant='dark'>
            <thead>
                <tr>
                <th>Číslo izby</th>
                <th>Meno</th>
                <th>Priezvisko</th>
                <th>Dátum príchodu/odchodu</th>
                <th>Ubytovaný</th>
                </tr>
            </thead>
            <tbody>
                {
                    displayedGuests.map((guest, index) => {
                        return (
                            <tr style={{fontWeight:"bold"}}>
                                <td>{guest.room.roomNumber}</td>
                                <td>{guest.guestName}</td>
                                <td>{guest.guestLastName}</td>
                                <td>
                                {Moment(new Date(guest.reservation.arrivalDate)).format('DD.MM.YYYY')}
                                <br />
                                {Moment(new Date(guest.reservation.departureDate)).format('DD.MM.YYYY')}
                                </td>
                                <td>
                                {
                                    guest.accomodated ?
                                    <BsCheckSquareFill  color='green' size={22} style={{marginLeft:"5px"}}/> :
                                    <BsXSquareFill  color='red'  size={22} style={{marginLeft:"5px"}}/>
                                }
                                {
                                    guest.accomodated ?
                                    <Button variant="success" onClick={handleShow} style={{marginLeft:"10px"}}>Odubytovať</Button> :
                                    null
                                }

                                </td>
                                <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Stornovať rezerváciu?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Odubytovať hosťa {guest.guestName} {guest.guestLastName}?</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Zrušiť
                                </Button>
                                <Button variant="danger" onClick={() => checkout(index)}>
                                    Áno
                                </Button>
                                </Modal.Footer>
                            </Modal>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    </div>
    );
  }
  
export default GuestList;