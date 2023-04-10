import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from "react-router-dom";

function CheckIn() {
    const params = useLocation();
    const [capacity, setCapacity] = useState([])
    useEffect(() => {
        let tmpArr = []
        for(let i = 1; i <= params.state.reservation.room.capacity; i++)
        {
            tmpArr.push(i)
        }
        setCapacity(tmpArr)
        console.log(params.state.reservation)
    }, []);

    const initialValues = {
        numberOfTickets: '',
        tickets: []
    };

    const validationSchema = Yup.object().shape({
        numberOfTickets: Yup.string()
            .required('Zadajte počet hostí'),
        tickets: Yup.array().of(
            Yup.object().shape({
                name: Yup.string()
                    .required('Meno je povinné'),
                surname: Yup.string()
                    .required('Priezvisko je povinné')
            })
        )
    });

    function onChangeTickets(e, field, values, setValues) {
        const tickets = [...values.tickets];
        const numberOfTickets = e.target.value || 0;
        const previousNumber = parseInt(field.value || '0');
        if (previousNumber < numberOfTickets) {
            for (let i = previousNumber; i < numberOfTickets; i++) {
                tickets.push({ name: '', surname: '' });
            }
        } else {
            for (let i = previousNumber; i >= numberOfTickets; i--) {
                tickets.splice(i, 1);
            }
        }
        setValues({ ...values, tickets });

        field.onChange(e);
    }

    function onSubmit(fields) {
        // TODO dokončit funkcionalitu pre priradenie hostí k izbe -> čo sa stane po kliknuti na tlačidlo ubytovat (aby sa vedelo akí hostia su v danej izbe v daný čas)
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
    }


    return (
        <div className="backgroundImageCVR">
        <div className="background-image"></div>
            <div className="checkin-background">
            <h3>Počet hostí:</h3>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, values, touched, setValues }) => (
                <Form>
                    <div className='custom-input'>
                    <Field name="numberOfTickets">
                    {({ field }) => (
                        <select {...field} class={'form-control' + (errors.numberOfTickets && touched.numberOfTickets ? ' is-invalid' : '')} onChange={e => onChangeTickets(e, field, values, setValues)}>
                            <option value=""></option>
                            {capacity.map(i => 
                                <option key={i} value={i}>{i}</option>
                            )}
                        </select>
                    )}
                    </Field>
                    <ErrorMessage name="numberOfTickets" component="div" className="invalid-feedback" />
                    </div>              
                        <FieldArray name="tickets">
                        {() => (values.tickets.map((ticket, i) => {
                            const ticketErrors = errors.tickets?.length && errors.tickets[i] || {};
                            const ticketTouched = touched.tickets?.length && touched.tickets[i] || {};
                            return (
                                <div key={i} className="guest">
                                        <h3 className='guest-full'>Hosť {i + 1}</h3>
                                        <div className='guest-half'>
                                            <h5>Meno:</h5>
                                            <Field name={`tickets.${i}.name`} type="text" className={'form-control' + (ticketErrors.name && ticketTouched.name ? ' is-invalid' : '' )} />
                                            <ErrorMessage name={`tickets.${i}.name`} component="div" className="invalid-feedback" />
                                        </div>
                                        <div className='guest-half'>
                                            <h5>Priezvisko:</h5>
                                            <Field name={`tickets.${i}.surname`} type="text" className={'form-control' + (ticketErrors.surname && ticketTouched.surname ? ' is-invalid' : '' )} />
                                            <ErrorMessage name={`tickets.${i}.surname`} component="div" className="invalid-feedback" />
                                        </div>
                                </div>
                            );
                        }))}

                        </FieldArray>
                       
                        <button type="submit" className="btn btn-primary mr-1 guest-button">
                            Ubytovať
                        </button>
                            
                        
                    
                </Form>
            )}
        </Formik>
            </div> 
        </div>
    );
  }
  
  export default CheckIn;