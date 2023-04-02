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

const json = [
    {
      "firstName": "Peter",
      "lastName": "Bomber",
      "employeeId": 518
    }
  ]

function Manage() {
    const [personName, setPersonName] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [displayedEmployees, setDisplayedEmployees] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        filtering();
    }, [personName]);

    function filtering(){
        console.log("filtrujem")
        let tmpArray = []
        json.map(employee => {
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
    }

    function deleteEmployee(index, employeeId){

    }

    return (
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
                                            <td>{employee.employeeId}</td>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td><Button variant="danger" style={{width:"50%"}} onClick={handleShow}>Vymazať</Button> </td>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Vymazať zamestnanca {employee.employeeId}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Vymazať zamestnanca {employee.firstName} {employee.lastName}?</Modal.Body>
                                                <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Zrušiť
                                                </Button>
                                                <Button variant="danger" onClick={() => deleteEmployee(index, employee.employeeId)}>
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