// // src/pages/EmployeeManagement.jsx
// import { useState, useEffect } from "react";
// import { baseUrl } from "./baseUrl";
// import axios from "axios"

//Without Redux Toolkit

// const EmployeeManagement = () => {
//   const [employees, setEmployees] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     position: "",
//     department: "",
//     salary: "",
//     dateOfJoining: "",
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/employees`);
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("Error Fetching Employees:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editingId) {
//         await axios.put(`${baseUrl}/employees/${editingId}`, formData);
//         alert("Employee updated successfully!");
//       } else {
//         const response = await axios.post(`${baseUrl}/employees`, formData);
//         console.log(response);

//         alert("Employee added successfully!");
//       }

//       setFormData({
//         name: "",
//         email: "",
//         position: "",
//         department: "",
//         salary: "",
//         dateOfJoining: "",
//       });
//       setEditingId(null);
//       fetchEmployees();
//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//       alert("Error: " + (error.response?.data?.message || error.message));
//     }
//   };

//   const handleEdit = (employee) => {
//     setFormData({
//       name: employee.name,
//       email: employee.email,
//       position: employee.position,
//       department: employee.department,
//       salary: employee.salary,
//       dateOfJoining: employee.dateOfJoining,
//     });
//     setEditingId(employee._id); // Store ID for updating
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this employee?")) return;

//     try {
//       await axios.delete(`${baseUrl}/employees/${id}`);
//       alert("Employee deleted successfully!");
//       fetchEmployees(); // Refresh employee list
//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//       alert("Error: " + (error.response?.data?.message || error.message));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <header className="bg-primary p-4">
//           <h1 className="text-white text-2xl font-semibold">
//             Employee Management
//           </h1>
//         </header>
//         <div className="p-6">
//           <section className="mb-6">
//             <form
//               onSubmit={handleSubmit}
//               className="grid grid-cols-1 gap-6 sm:grid-cols-2"
//             >
//               <div>
//                 <label className="block text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 w-full border rounded-md"
//                   placeholder="John Doe"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 w-full border rounded-md"
//                   placeholder="john.doe@example.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Position</label>
//                 <input
//                   type="text"
//                   name="position"
//                   value={formData.position}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 w-full border rounded-md"
//                   placeholder="Software Engineer"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Department</label>
//                 <input
//                   type="text"
//                   name="department"
//                   value={formData.department}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 w-full border rounded-md"
//                   placeholder="IT"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Salary</label>
//                 <input
//                   type="number"
//                   name="salary"
//                   value={formData.salary}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 w-full border rounded-md"
//                   placeholder="50000"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Date of Joining</label>
//                 <input
//                   type="text"
//                   name="dateOfJoining"
//                   value={formData.dateOfJoining}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 w-full border rounded-md"
//                   placeholder="12-March-25"
//                   required
//                 />
//               </div>
//               <div className="sm:col-span-2 text-right">
//                 <button
//                   type="submit"
//                   className="bg-primary text-white px-4 py-2 rounded-md"
//                 >
//                   {editingId ? "Update Employee" : "Add Employee"}
//                   Add Employee
//                 </button>
//               </div>
//             </form>
//           </section>
//           <section>
//             <h2 className="text-xl font-semibold mb-4">Employee Records</h2>
//             <div className="bg-gray-50 p-4 rounded-lg shadow-inner">

//               <table className="w-full border-collapse border border-gray-200">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border border-gray-300 p-2">Name</th>
//                     <th className="border border-gray-300 p-2">Email</th>
//                     <th className="border border-gray-300 p-2">Position</th>
//                     <th className="border border-gray-300 p-2">Department</th>
//                     <th className="border border-gray-300 p-2">Salary</th>
//                     <th className="border border-gray-300 p-2">
//                       Date of Joining
//                     </th>
//                     <th className="border border-gray-300 p-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employees.length > 0 ? (
//                     employees.map((emp, index) => (
//                       <tr key={index} className="border border-gray-200">
//                         <td className="border border-gray-300 p-2">
//                           {emp.name}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {emp.email}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {emp.position}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {emp.department}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {emp.salary}
//                         </td>
//                         <td className="border border-gray-300 p-2">
//                           {emp.dateOfJoining}
//                         </td>
//                         <td className="border border-gray-300 p-2 text-center">
//                       <button
//                         onClick={() => handleEdit(emp)}
//                         className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(emp._id)}
//                         className="bg-red-500 text-white px-2 py-1 rounded-md"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="6" className="text-center text-gray-500 p-4">
//                         No employees found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeManagement;

// with Redux Toolkit
import { useState, useEffect } from "react";
// import { baseUrl } from "./baseUrl";

import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../store/employeeSlice";
import { useDispatch, useSelector } from "react-redux";

const EmployeeManagement = () => {
  const { employees, loading, error } = useSelector((state) => state.employees);
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
    dateOfJoining: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      dispatch(updateEmployee({ id: editingId, employeeData: formData }));
      alert("Employee updated successfully!");
    } else {
      dispatch(addEmployee(formData));
      alert("Employee added successfully!");
    }

    setFormData({
      name: "",
      email: "",
      position: "",
      department: "",
      salary: "",
      dateOfJoining: "",
    });
    setEditingId(null);
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee._id); // Store ID for updating
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    dispatch(deleteEmployee(id));
    alert("Employee Deleted SuccessFully");
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <header className="bg-primary p-4">
          <h1 className="text-white text-2xl font-semibold">
            Employee Management
          </h1>
        </header>
        <div className="p-6">
          <section className="mb-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
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
              <div>
                <label className="block text-gray-700">Date of Joining</label>
                <input
                  type="text"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="12-March-25"
                  required
                />
              </div>
              <div className="sm:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  {editingId ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </form>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Employee Records</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}

              <h3>Total Employees: {employees.length}</h3>
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Position</th>
                    <th className="border border-gray-300 p-2">Department</th>
                    <th className="border border-gray-300 p-2">Salary</th>
                    <th className="border border-gray-300 p-2">
                      Date of Joining
                    </th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length > 0 ? (
                    employees.map((emp, index) => (
                      <tr key={index} className="border border-gray-200">
                        <td className="border border-gray-300 p-2">
                          {emp.name}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {emp.email}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {emp.position}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {emp.department}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {emp.salary}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {emp.dateOfJoining}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <button
                            onClick={() => handleEdit(emp)}
                            className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(emp._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-gray-500 p-4">
                        No employees found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
