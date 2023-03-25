import Table from 'react-bootstrap/Table';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect, useContext, forwardRef } from "react";
import { format } from 'date-fns'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { FaCalendar, FaBed  } from 'react-icons/fa';

function Filter() {
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date(Date.now() + ( 3600 * 1000 * 24)));
const [value, setValue] = useState("one");
const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button className="button" onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));
  return (
    <div class="container">
        <div className='filter'>
            <div className='prichod'>
            <h4> <FaCalendar  /> Dátum príchodu</h4>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                        customInput={<ExampleCustomInput />} showIcon minDate={new Date()}/>
            </div>
            <div className='odchod'>
            <h4> <FaCalendar  /> Dátum odchodu</h4>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                        customInput={<ExampleCustomInput />}minDate={new Date(Date.now() + ( 3600 * 1000 * 24))} showIcon/>
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
                <FormControlLabel value="one" control={<Radio />} label="1 lôžko" />
                <FormControlLabel value="two" control={<Radio />} label="2 lôžka" />
                <FormControlLabel value="three" control={<Radio />} label="3 lôžka" />
            </RadioGroup>
            </div>
        </div>
    </div>
  );
}

export default Filter;