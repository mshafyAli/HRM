// import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

// const Employee = () => {
//     const [employees, setEmployees] = useState([]);
//     const [employeeData, setEmployeeData] = useState({
//         name: '',
//         email: '',
//         position: '',
//         department: '',
//         salary: ''
//     });

//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     const fetchEmployees = async () => {
//         try {
//             const res = await axios.get('/employees');
//             setEmployees(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEmployeeData({ ...employeeData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('/employees/add', employeeData);
//             fetchEmployees();
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <div className='flex flex-col items-center'>
//             <h2 className='text-start text-3xl my-2'>Employee Management</h2>
//             <form onSubmit={handleSubmit} className='flex flex-col'>
//                 <input type="text" name="name" value={employeeData.name} onChange={handleChange} placeholder="Name" required className=' w-[35rem] text-xl px-3 py-2 my-2 border border-gray-400 rounded-xl'/>
//                 <input type="email" name="email" value={employeeData.email} onChange={handleChange} placeholder="Email" required className=' w-[35rem] text-xl px-3 py-2 my-2 border border-gray-400 rounded-xl'/>
//                 <input type="text" name="position" value={employeeData.position} onChange={handleChange} placeholder="Position" required className=' w-[35rem] text-xl px-3 py-2 my-2 border border-gray-400 rounded-xl'/>
//                 <input type="text" name="department" value={employeeData.department} onChange={handleChange} placeholder="Department" required className=' w-[35rem] text-xl px-3 py-2 my-2 border border-gray-400 rounded-xl'/>
//                 <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} placeholder="Salary" required className=' w-[35rem] text-xl px-3 py-2 my-2 border border-gray-400 rounded-xl'/>
//                 <button type="submit" className=' bg-primary py-3 rounded-full'>Add Employee</button>
//             </form>
//             <h3 className=' text-start text-2xl'>Employee List</h3>
//             <ul>
//                 {employees.map(employee => (
//                     <li key={employee._id}>{employee.name} - {employee.email}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Employee;

// src/pages/EmployeeManagement.jsx
import { useState, useEffect } from "react";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
  });
  const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (editMode) {
      setEmployees(employees.map(employee => 
        employee.id === currentId ? { ...formData, id: currentId } : employee
      ));
      setEditMode(false);
      setCurrentId(null);
    } else {
        setEmployees([...employees, { ...formData, id: Date.now() }]);
        await axios.post('/employees/add', );
            fetchEmployees();
    }
    setFormData({ name: '', email: '', position: '', department: '', salary: '' });
  };

  const handleEdit = (id) => {
    const employee = employees.find(employee => employee.id === id);
    setFormData(employee);
    setEditMode(true);
    setCurrentId(id);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <header className="bg-primary p-4">
          <h1 className="text-white text-2xl font-semibold">Employee Management</h1>
        </header>
        <div className="p-6">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">{editMode ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Software Engineer"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="IT"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="50000"
                  required
                />
              </div>
              <div className="sm:col-span-2 text-right">
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
                  {editMode ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Employee Records</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              {employees.length === 0 ? (
                <p className="text-gray-700">No employee records.</p>
              ) : (
                <ul>
                  {employees.map((employee) => (
                    <li key={employee.id} className="mb-4 p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
                      <div>
                        <p><strong>Name:</strong> {employee.name}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Position:</strong> {employee.position}</p>
                        <p><strong>Department:</strong> {employee.department}</p>
                        <p><strong>Salary:</strong> ${employee.salary}</p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleEdit(employee.id)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;

