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
import axios from "axios";


function Filter() {
  const [displayedRooms, setDisplayedRooms] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + ( 3600 * 1000 * 24)));
  const [value, setValue] = useState(1);
  const [role, setRole] = useState(localStorage.getItem("role")?localStorage.getItem("role"):null);
  const navigate = useNavigate();
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <Button className="button" onClick={onClick} ref={ref}>
        {value}
      </Button>
    ));
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    
    axios.get('https://localhost:7032/api/Room')
    .then((response) => {
          console.log(response);
          setAllRooms(response.data);
          filtering()
    })
    .catch((err) => {
          
    });
  }, [startDate, endDate, value, loading]);

  function filtering(){
    let tempArray = []
    allRooms.map((room, index) => 
    {
      if(value == room.capacity)
      {
        let add = true;
        room.occupancy.map(processedDate => {
          const startDateMiliseconds = startDate.setHours(0,0,0,0)
          const endDateMiliseconds = endDate.setHours(0,0,0,0)
          const roomStartDate = new Date(processedDate.startDate).setHours(0,0,0,0)
          const roomEndDate = new Date(processedDate.endDate).setHours(0,0,0,0)
          if(!((startDateMiliseconds < roomStartDate && endDateMiliseconds <= roomStartDate)
            || (startDateMiliseconds >= roomEndDate && endDateMiliseconds > roomEndDate))){
            add = false;
          }
        })
        if(add){
          tempArray.push(room)
        }
      }
    })
    setDisplayedRooms(tempArray);
    if(loading == true){
      setLoading(false);
    }
  }

  return loading ? (<div>Loading</div>) :
    (<div class="container">
        <div className='filter'>
            <div className='prichod'>
            <h4> <FaCalendar  /> Dátum príchodu</h4>
            <DatePicker selected={startDate} onChange={(date) => 
            {
                if(date.setHours(0,0,0,0) >= endDate.setHours(0,0,0,0)){
                  setEndDate(new Date(date.setHours(0,0,0,0) + ( 3600 * 1000 * 24)))
                }
                setStartDate(date)
              }
            }
                        customInput={<ExampleCustomInput />} showIcon minDate={new Date()}/>
            </div>
            <div className='odchod'>
            <h4> <FaCalendar  /> Dátum odchodu</h4>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                        customInput={<ExampleCustomInput />}minDate={new Date(startDate.setHours(0,0,0,0) + ( 3600 * 1000 * 24))} showIcon/>
            </div>
            <div className='izby'>
            <h4> <FaBed  /> Počet lôžok</h4>
            <RadioGroup
                row
                className='radio'
                value={value}
                name="radio-buttons-group"
                onChange={(e)=> setValue(e.target.value)}   
            >
                <FormControlLabel value={1} control={<Radio />} label="1 lôžko" />
                <FormControlLabel value={2} control={<Radio />} label="2 lôžka" />
                <FormControlLabel value={3} control={<Radio />} label="3 lôžka" />
            </RadioGroup>
            </div>
        </div>
        {
          displayedRooms.length === 0
          ?
          <div className='sorry'>
            <BiSad  size={150}/>
            <h3>V zadanom období niesú dostupné žiadne izby.</h3>
          </div>
          :
          displayedRooms.map((room,index) => {
            return(
              <div class="room">
                <div className='roomImage'>
                  <img src={room.photo} className='imgroom' alt=''/>
                </div>
                <div class="description">
                  <h3>Počet lôžok: {room.capacity}</h3>
                  <p>Číslo izby: {room.roomNumber}, poschodie: {room.floor}</p>
                  <p>Popis: {room.description}</p>
                  <p>Cena za noc: {room.priceForNight}€</p>
                  <p>Počet nocí: {Math.round((endDate.setHours(0,0,0,0,) - startDate.setHours(0,0,0,0))/86400000)}</p>
                  {
                    role == null 
                    ?
                    <Button variant="success" onClick={() => navigate('/login')}>Pre rezerváciu je potrebné sa prihlásiť</Button> 
                    :
                    <Button variant="success" onClick={() => navigate('/createreservation', {state: {room: room, startDate: startDate, endDate: endDate}})}>Rezervovať - &nbsp;
                    {Math.round((endDate.setHours(0,0,0,0,) - startDate.setHours(0,0,0,0))/86400000) * room.priceForNight}
                    €
                    </Button>
                  }
                </div>
              </div>
            )
          })
        }
        
    </div>
  );
}

export default Filter;