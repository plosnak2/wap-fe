import Table from 'react-bootstrap/Table';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect, useContext, forwardRef } from "react";
import { format } from 'date-fns'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { FaCalendar, FaBed  } from 'react-icons/fa';

const json = [
  {
    "roomNumber": 211,
    "capacity": 2,
    "description": "Izba je priestranná s výhľadom na more. Obsahuje veľkú manželskú posteľ, kúpeľňu spolu s wc. Na izbe je taktiež minibar dopĺňaný každý deň nealkoholickými a miestnymi alkoholickými nápojmi. Nachádza sa 2 minúty pešo od mora a je vzdialené 30 metrov od recepcie. Je naklonená na slnečnú stranu.",
    "priceForNight": 115,
    "floor": 3,
    "photo": "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg",
    "occupancy": [
      {
        "startDate": "Mon Apr 01 2023 00:00:00 GMT+0200 (Central European Summer Time)",
        "endDate": "2023-04-08T00:00:00.000Z"
      },
      {
        "startDate": "Mon Apr 15 2023 00:00:00 GMT+0200 (Central European Summer Time)",
        "endDate": "2023-04-20T00:00:00.000Z"
      }
    ]
  }
]

function Filter() {
  const [displayedRooms, setDisplayedRooms] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + ( 3600 * 1000 * 24)));
  const [value, setValue] = useState(1);
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <Button className="button" onClick={onClick} ref={ref}>
        {value}
      </Button>
    ));

  useEffect(() => {
    filtering();
  }, [startDate, endDate, value]); // Only re-run the effect if count changes

  function filtering(){
    //setDisplayedRooms([]);
    let tempArray = []
    json.map((room, index) => 
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
  }

  return (
    <div class="container">
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
                  <p>Cena za noc: {room.priceForNight}</p>
                  <Button variant="success" >Rezervovať - 450€</Button>
                </div>
              </div>
            )
          })
        }
    </div>
  );
}

export default Filter;