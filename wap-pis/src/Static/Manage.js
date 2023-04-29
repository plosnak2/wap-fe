import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useContext } from "react";
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { useNavigate, useLocation } from "react-router-dom";
import { FaFilter, FaBed  } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


function Manage() {
    const [personName, setPersonName] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [displayedEmployees, setDisplayedEmployees] = useState([])
    const navigate = useNavigate();

    const [allEmployee, setAllEmployee] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:7032/api/Employee')
        .then((response) => {
            console.log(response);
            setAllEmployee(response.data);
            filtering();
        })
        .catch((err) => {
            
        });
    }, [personName, loading]);

    function filtering(){
        console.log("filtrujem")
        let tmpArray = []
        allEmployee.map(employee => {
            let add = true;

            if(!employee.lastName.toLowerCase().includes(personName.toLowerCase()))
            {
                add = false
            }
    
            if(add)
            {
                tmpArray.push(employee)
            }
        })
        setDisplayedEmployees(tmpArray)
        setLoading(false)
    }

    function deleteEmployee(index, employeeId){
        console.log(employeeId);
        axios.delete('https://localhost:7032/api/Employee/' + employeeId)
        .then((response) => {
            console.log(response);
            setLoading(true);
        })
        .catch((err) => {
            
        });
    }

    return loading ? (<div>Loading</div>) : (
        <div className="backgroundImageCVR">
        <div className="background-image"></div>
            <div className="checkin-background">
                    <div className='filter-employees'>
                    <h4> <FaFilter  /> Priezvisko zamestnanca</h4>
                        <Form.Control
                            type="text"
                            className='input-reserve'
                            value={personName}
                            onChange={(e) => setPersonName(e.target.value)}
                        />
                    </div>
                    <Button variant="primary" className='button-employee-new' onClick={() => navigate('/registeremployee', {replace: true})}>Pridať zamestnanca</Button>
                    <Table striped bordered hover size="sm" variant="light" style={{marginTop:"30px"}}>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Meno</th>
                            <th>Priezvisko</th>
                            <th>Akcia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displayedEmployees.map((employee, index) => {
                                    return(
                                        <tr>
                                            <td>{employee.id}</td>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td><Button variant="danger" style={{width:"50%"}} onClick={handleShow}>Vymazať</Button> </td>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Vymazať zamestnanca {employee.id}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Vymazať zamestnanca {employee.firstName} {employee.lastName}?</Modal.Body>
                                                <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Zrušiť
                                                </Button>
                                                <Button variant="danger" onClick={() => (deleteEmployee(index, employee.id), handleClose())}>
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
        </div>
    );
  }
  
  export default Manage;