import Table from 'react-bootstrap/Table';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect, useContext, forwardRef } from "react";
import { format } from 'date-fns'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { FaCalendar, FaBed  } from 'react-icons/fa';
import { BiSad } from 'react-icons/bi';
import {Navigate, useNavigate } from 'react-router-dom'

const json = [
    {
      "roomNumber": 212,
      "image": "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg",
      "floor": 3,
      "capacity": 2,
      "priceForNight": 115,
      "description": "Izba je priestranná s výhľadom na more. Obsahuje veľkú manželskú posteľ, kúpeľňu spolu s wc. Na izbe je taktiež minibar dopĺňaný každý deň nealkoholickými a miestnymi alkoholickými nápojmi. Nachádza sa 2 minúty pešo od mora a je vzdialené 30 metrov od recepcie. Je naklonená na slnečnú stranu.",
      "guest": [
        {
          "firstName": "Pavol",
          "lastName": "Bomber",
          "accomodated": true
        }
      ]
    }
  ]


function Rooms() {
  useEffect(() => {

  }, []);

  function guestsInRoom(room){
    let guests = 0;
    for(let i = 0; i < room.guest.length; i++){
        if (room.guest[i].accomodated === true)
        {
            guests++;
        }
        return guests
    }
  }

  return (
    <div class="container">
        {
            json.map((room, index) => {
                return(
                    <div class="room-employee">
                      <div className='roomImage-employee'>
                        <img src={room.image} className='imgroom-employee' alt=''/>
                      </div>
                      <div class="description-employee">
                        <h3>Číslo izby: {room.roomNumber}</h3>
                        <p>Počet lôžok: {room.capacity}, poschodie: {room.floor}</p>
                        <p>Popis: {room.description}</p>
                        <p>Cena za noc: {room.priceForNight}€</p>
                        {
                            guestsInRoom(room) === 0 ?
                            <p style={{color:"green"}}>Stav: Voľná</p> :
                            <p style={{color:"red"}}>Stav: Obsadená</p>
                        }
                        {
                            guestsInRoom(room) !== 0 ?
                            <p>Aktuálne ubytovaní hostia: {
                                room.guest.map((guest, index) => {
                                    return<p>{guest.firstName} {guest.lastName}</p>
                                })
                            }</p> :
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

export default Rooms;