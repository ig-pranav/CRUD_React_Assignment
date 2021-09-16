import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import * as ReactBootstrap from "react-bootstrap";


function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [number, setNumber] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3500/addEmployee", {
      name: name,
      age: age,
      designation: designation,
      department: department,
      number: number,
    }).then(()=> {
      setEmployeeList([...employeeList, {
        name: name,
        age: age,
        designation: designation,
        department: department,
        phoneNumber: number,
      }]);
    })
  };

  const updateEmployee = (id) => {
    const newName = prompt("Please new Name of");
    const newAge = prompt("Please new Age of");
    const newDesignation = prompt("Please new Designation");
    const newDepartment = prompt("Please new Department");
    const newNumber = prompt("Please new Phone Number ");

    Axios.put("http://localhost:3500/update", {
      newName: newName,
      newAge: newAge,
      newDesignation: newDesignation,
      newDepartment: newDepartment,
      newNumber: newNumber,
      id: id,
    }).then(() => {
      setEmployeeList(employeeList.map((val) => {
        return val._id === id ? {
          _id: id,
          name: newName,
          age: newAge,
          designation: newDesignation,
          department: newDepartment,
          phoneNumber: newNumber,
        } : val;
      }));
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3500/delete/${id}`)
    .then(() => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val._id !== id;
      }));
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3500/read")
    .then((response) => {
      setEmployeeList(response.data)
    })
    .catch(() => {
      console.log("error");
    })
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <h1>Enter Employee Details</h1>
        <label>Enter the Name : </label>
        <input 
          type="text" 
          placeholder="Enter Name" 
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Enter the Age : </label>
        <input 
          type="number" 
            placeholder="Enter age"
              onChange={(event) => {
                setAge(event.target.value);
          }}
        />
        <label>Enter the Designation : </label>
        <input 
          type="text" 
            placeholder="Enter Designation" 
              onChange={(event) => {
                setDesignation(event.target.value);
          }}
        />
        <label>Enter the Department : </label>
        <input 
          type="text" 
            placeholder="Enter Department"
              onChange={(event) => {
                setDepartment(event.target.value);
          }}
        />
        <label>Enter the Phone Number : </label>
        <input 
          type="number" 
            placeholder="Enter Phone Number" 
              onChange={(event) => {
                setNumber(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employees</button>
      </div>

      {/* <h1>Employees List </h1> */}

      <ReactBootstrap.Table striped bordered hover>
  <thead>
    <tr className="table-primary">
      <th>Name</th>
      <th>Age</th>
      <th>Designation</th>
      <th>Department</th>
      <th>Phone Number</th>
      <th>Update</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
      {employeeList.map((val) => {
        return (
        <tr>
          <td>{val.name}</td> 
          <td>{val.age}</td> 
          <td>{val.designation}</td> 
          <td>{val.department}</td> 
          <td>{val.phoneNumber}</td> 
          <td>
            <button 
              class="btn btn-warning"
                onClick={() => {
                  updateEmployee(val._id)}}> Update
            </button>
          </td> 
          <td>
            <button
              class="btn btn-danger"
                onClick={() => {
                  deleteEmployee(val._id)}}> Delete
            </button>
          </td> 
        </tr>
        );
      })}
    </tbody>
  </ReactBootstrap.Table>   
</div>
  );
}

export default App;
