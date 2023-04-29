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
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function GuestList() {
    const [roomNumber, setRoomNumber] = useState('')
    const [personName, setPersonName] = useState('')
    const [checkAccomodated, setCheckAccomodated] = useState(true)
    const [checkNotAccomodated, setCheckNotAccomodated] = useState(false)
    const [displayedGuests, setDisplayedGuests] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true);
    const [allGuests, setAllGuests] = useState([]);
    const [id, setId] = useState(0);

    useEffect(() => {
        axios.get('https://localhost:7032/api/Room/guests')
        .then((response) => {
            console.log(response);
            filtering(response.data)
        })
        .catch((err) => {
            
        });
    }, [roomNumber, personName, checkAccomodated, checkNotAccomodated, loading]);
    
    function filtering(allGuests){
        console.log("filtrujem")
        console.log(allGuests)
        let tmpArray = []
        allGuests.map(guest => {
            let add = true;
            if(!((checkAccomodated && guest.accomodated) || (checkNotAccomodated && !guest.accomodated))){
                add = false
            }
    
            if(!guest.room.roomnumber.toString().includes(roomNumber))
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
        setLoading(false)
      }

    function checkout(index){
        console.log(id)
        console.log(displayedGuests[id].guestName)
        const deleteGuest = {
            "guestName": displayedGuests[id].guestName,
            "guestLastName": displayedGuests[id].guestLastName,
            "roomNumber": displayedGuests[id].room.roomnumber
        }
        
        axios.post('https://localhost:7032/api/Room/checkout', deleteGuest)
        .then((response) => {
            console.log(response)
            toast("Hosť odubytovaný");
            setLoading(true)
        })
        .catch((err) => {

        });
    }

    return loading ? (<div>Loading</div>) : (
        <div class="container">
        <div className='filter'>
            <Toaster position="top-center" reverseOrder={false}/>
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
                {/*Neubytovaný: <Checkbox {...label}  className="check" checked={checkNotAccomodated} onChange={() => setCheckNotAccomodated(!checkNotAccomodated)}/>*/}
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
                                <td>{guest.room.roomnumber}</td>
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
                                    <Button variant="success" onClick={() => (handleShow(), console.log(index), setId(index))} style={{marginLeft:"10px"}}>Odubytovať</Button> :
                                    null
                                }

                                </td>
                                <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Odubytovať hosťa?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Odubytovať hosťa?</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Zrušiť
                                </Button>
                                <Button variant="danger" onClick={() => (checkout(index), handleClose())}>
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