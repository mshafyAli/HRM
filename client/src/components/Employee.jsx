import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        position: '',
        department: '',
        salary: ''
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get('/employees');
            setEmployees(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/employees/add', employeeData);
            fetchEmployees();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Employee Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={employeeData.name} onChange={handleChange} placeholder="Name" required />
                <input type="email" name="email" value={employeeData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="position" value={employeeData.position} onChange={handleChange} placeholder="Position" required />
                <input type="text" name="department" value={employeeData.department} onChange={handleChange} placeholder="Department" required />
                <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} placeholder="Salary" required />
                <button type="submit">Add Employee</button>
            </form>
            <h3>Employee List</h3>
            <ul>
                {employees.map(employee => (
                    <li key={employee._id}>{employee.name} - {employee.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default Employee;
