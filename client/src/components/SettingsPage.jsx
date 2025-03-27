// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function AttendanceCards() {
//   const dispatch = useDispatch();
//   const { employees, loading } = useSelector((state) => state.employees);
//   const [attendance, setAttendance] = useState({
//     employeeId: "",
//     name: "",
//     department: "",
//     inTime: "02:23 PM",
//     outTime: "05:30 PM",
//     position: "",
//     status: "Present", // Default value
//     date: new Date().toISOString().split("T")[0], // Default to today
//   });

//   const handleInputChange = (employeeId, field, value) => {
//     const updatedEmployees = employees.map((emp) => {
//       if (emp.id === employeeId) {
//         const updatedEmployee = { ...emp, [field]: value };

//         // Check if both inTime and outTime are filled
//         if (updatedEmployee.inTime && updatedEmployee.outTime) {
//           updatedEmployee.workingHours = calculateWorkingHours(
//             updatedEmployee.inTime,
//             updatedEmployee.outTime
//           );
//         } else {
//           updatedEmployee.workingHours = "-";
//         }

//         return updatedEmployee;
//       }
//       return emp;
//     });

//     setAttendance(updatedEmployees);
//   };

//   // ✅ WORKING calculateWorkingHours function
//   const calculateWorkingHours = (inTimeStr, outTimeStr) => {
//     if (!inTimeStr || !outTimeStr) return "-";

//     const [inHours, inMinutes] = inTimeStr.split(":").map((t) => parseInt(t));
//     const [outHours, outMinutes] = outTimeStr
//       .split(":")
//       .map((t) => parseInt(t));

//     // Handle cases where parsing fails
//     if (
//       isNaN(inHours) ||
//       isNaN(inMinutes) ||
//       isNaN(outHours) ||
//       isNaN(outMinutes)
//     ) {
//       return "-";
//     }

//     const inTotalMinutes = inHours * 60 + inMinutes;
//     const outTotalMinutes = outHours * 60 + outMinutes;

//     // Out time should be after in time
//     if (outTotalMinutes <= inTotalMinutes) return "-";

//     const diffMinutes = outTotalMinutes - inTotalMinutes;
//     const hours = Math.floor(diffMinutes / 60);
//     const minutes = diffMinutes % 60;

//     return `${hours}h ${minutes}m`;
//   };

//   // Handle save attendance
//   const handleSaveAttendance = (id) => {
//     console.log(`Saving attendance for employee ${id}`);
//     // In a real app, you would send this data to your backend
//   };

//   return (
//     <div className="max-w-5xl mx-auto">
//       <form>
//         <div className="flex justify-center items-center gap-2 pt-6">
//           <h1 className="text-sm font-bold">Select Date:</h1>
//           <input
//             type="date"
//             value={attendance.date}
//             onChange={(e) =>
//               setAttendance({ ...attendance, date: e.target.value })
//             }
//             className="w-auto px-2 py-1"
//           />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-6">
//           {employees.map((employee) => (
//             <div
//               key={employee.id}
//               className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
//             >
//               <div className="p-4">
//                 {/* Header with name and status */}
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="text-lg font-bold text-gray-900">
//                     {employee.name}
//                   </h3>
//                 </div>

//                 {/* Department and position */}
//                 <p className="text-sm text-gray-600 mb-4">
//                   {employee.department} • {employee.position}
//                 </p>

//                 {/* Time tracking section */}
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">In Time</p>
//                     <div className="flex items-center">
//                       <input
//                         type="text"
//                         value={employee.inTime}
//                         onChange={(e) =>
//                           handleInputChange(
//                             employee.id,
//                             "inTime",
//                             e.target.value
//                           )
//                         }
//                         disabled={
//                           employee.status === "Leave" ||
//                           employee.status === "Absent"
//                         }
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                       <button className="ml-2 text-gray-400">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Out Time</p>
//                     <div className="flex items-center">
//                       <input
//                         type="text"
//                         value={employee.outTime}
//                         onChange={(e) =>
//                           handleInputChange(
//                             employee.id,
//                             "outTime",
//                             e.target.value
//                           )
//                         }
//                         disabled={
//                           employee.status === "Leave" ||
//                           employee.status === "Absent"
//                         }
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                       <button className="ml-2 text-gray-400">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="mr-2 text-sm">Status:</label>
//                     <select
//                       value={employee.status}
//                       onChange={(e) =>
//                         handleInputChange(employee.id, "status", e.target.value)
//                       }
//                       className="border rounded px-2 py-1 text-sm"
//                     >
//                       <option value="Present">Present</option>
//                       <option value="Absent">Absent</option>
//                       <option value="Leave">Leave</option>
//                     </select>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={employee.halfDay}
//                       disabled={
//                         employee.status === "Leave" ||
//                         employee.status === "Absent"
//                       }
//                       onChange={(e) =>
//                         handleInputChange(
//                           employee.id,
//                           "halfDay",
//                           e.target.checked
//                         )
//                       }
//                     />
//                     <label className="text-sm">Half Day</label>
//                   </div>
//                 </div>

//                 {/* Remarks section */}
//                 <div className="mb-4">
//                   <div className="flex justify-between items-center mb-1">
//                     <p className="text-xs text-gray-500">Remarks</p>
//                     {employee.status === "Present" ? (
//                       <>
//                         <p className="text-xs text-gray-500">
//                           Working Hours: {employee.workingHours}
//                         </p>
//                       </>
//                     ) : null}
//                   </div>
//                   <input
//                     type="text"
//                     value={employee.remarks}
//                     onChange={(e) =>
//                       handleInputChange(employee.id, "remarks", e.target.value)
//                     }
//                     placeholder="Add remarks..."
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 {/* Save button */}
//                 <button
//                   onClick={() => handleSaveAttendance(employee.id)}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-2"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                     <path
//                       fillRule="evenodd"
//                       d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   Save Attendance
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeBasicDetails } from "../store/employeeSlice";
import { createAttandance } from "../store/attandanceSlice";
import { useNavigate } from "react-router-dom";

const EmployeeAttendanceCard = ({ employee, selectedDate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/attandance/${employee._id}`);
  };

  const attandances = useSelector((state) => state.attandance.attandance._id);
  // const attendanceIds = attandances.map((item) => item.attandance._id);
  console.log("attendanceIds", attandances);

  // Fetch attendance details from Redux store
  const attandance = useSelector(
    (state) => state.attandance.attandance[employee.id] || {}
  );

  console.log("attandance", attandance);
  

  // Local state for attendance data
  const [attandanceData, setAttandanceData] = useState({
    employeeId: employee?._id, // Include employee ID
    status: attandance.status || "Present",
    inTime: attandance.inTime || "",
    outTime: attandance.outTime || "",
    workingHours: attandance.workingHours || "00:00",
    remarks: attandance.remarks || "",
    halfDay: attandance.halfDay || false,
    date: selectedDate, // Default to selected date
  });

  useEffect(() => {
    dispatch(fetchEmployeeBasicDetails(employee.id));
  }, [dispatch, employee.id]);

  // Update date when selectedDate changes
  useEffect(() => {
    setAttandanceData((prevData) => ({
      ...prevData,
      date: selectedDate,
    }));
  }, [selectedDate]);

  // Calculate working hours
  const calculateWorkingHours = (inTime, outTime) => {
    if (!inTime || !outTime) return "00:00";
    const inDate = new Date(`2023-01-01T${inTime}`);
    const outDate = new Date(`2023-01-01T${outTime}`);
    if (outDate < inDate) return "00:00";
    const diffMs = outDate - inDate;
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAttandanceData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
      if (name === "inTime" || name === "outTime") {
        updatedData.workingHours = calculateWorkingHours(
          name === "inTime" ? value : prevData.inTime,
          name === "outTime" ? value : prevData.outTime
        );
      }
      return updatedData;
    });
  };

  // Handle Save Attendance
  const handleSave = () => {
    console.log(attandanceData);
    dispatch(createAttandance(attandanceData));
    alert("Attendance saved successfully!");
    
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-900">{employee.name}</h3>
      </div>

      {/* Department and position */}
      <p className="text-sm text-gray-600 mb-4">
        {employee.department} • {employee.position}
      </p>

      
      <p className="text-gray-600">
        <strong>Date:</strong> {attandanceData.date}
      </p>

      {/* Attendance Inputs */}
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div className="mt-4">
          <label className="block text-sm font-medium">Status:</label>
          <select
            name="status"
            value={attandanceData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>
        </div>
        <div className="mt-2 flex items-center">
          <input
            type="checkbox"
            name="halfDay"
            checked={attandanceData.halfDay}
            onChange={handleChange}
            disabled={
              attandanceData.status === "Leave" ||
              attandanceData.status === "Absent"
            }
            className="mr-2"
          />
          <label className="text-sm font-medium">Mark as Half-Day</label>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-2 gap-4">
        <div className="mt-2">
          <label className="block text-sm font-medium">In-Time:</label>
          <input
            type="time"
            name="inTime"
            value={attandanceData.inTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-2">
          <label className="block text-sm font-medium">Out-Time:</label>
          <input
            type="time"
            name="outTime"
            value={attandanceData.outTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mt-2">
        <label className="block text-sm font-medium">Working Hours:</label>
        <input
          type="text"
          name="workingHours"
          value={attandanceData.workingHours}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm font-medium">Remarks:</label>
        <input
          type="text"
          name="remarks"
          value={attandanceData.remarks}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
        >
          Save
        </button>
        <button
          onClick={handleViewDetails}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
        >
          View All
        </button>
      </div>
    </div>
  );
};

const EmployeeAttendanceList = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  console.log("Full Redux State:", state);

  const { employees } = useSelector((state) => state.employees);

  // State for selected date
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    dispatch(fetchEmployeeBasicDetails());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Employee Attendance - {selectedDate}
      </h1>

      {/* Date Picker */}
      <div className="flex justify-center mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <EmployeeAttendanceCard
            key={employee.id}
            employee={employee}
            selectedDate={selectedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeAttendanceList;



// new code for checking


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { saveAttendance } from "../redux/actions/attendanceActions"; // Import your action
// import {  useNavigate } from "react-router-dom";
// import { createAttandance } from "../store/attandanceSlice";

// const EmployeeCard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [attendance, setAttendance] = useState({
//     status: "Present",
//     inTime: "",
//     outTime: "",
//     workingHours: "",
//     remarks: "",
//   });

//   const { employee } = useSelector((state) => state.employees);

//   const handleChange = (e) => {
//     setAttendance({ ...attendance, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     const attendanceData = {
//       ...attendance,
//       employee: employee._id, // Link attendance to employee
//       date: new Date().toISOString().split("T")[0], // Save current date
//     };

//     dispatch(createAttandance(attendanceData)); // Dispatch save action
//   };

//   return (
//     <div className="card">
//       <h3>{employee.name}</h3>
//       <p>Position: {employee.position}</p>
//       <p>Department: {employee.department}</p>

//       <label>Status:</label>
//       <select name="status" value={attendance.status} onChange={handleChange}>
//         <option value="Present">Present</option>
//         <option value="Absent">Absent</option>
//         <option value="Late">Late</option>
//         <option value="Leave">Leave</option>
//       </select>

//       <label>In Time:</label>
//       <input type="time" name="inTime" value={attendance.inTime} onChange={handleChange} />

//       <label>Out Time:</label>
//       <input type="time" name="outTime" value={attendance.outTime} onChange={handleChange} />

//       <label>Working Hours:</label>
//       <input type="text" name="workingHours" value={attendance.workingHours} onChange={handleChange} />

//       <label>Remarks:</label>
//       <input type="text" name="remarks" value={attendance.remarks} onChange={handleChange} />

//       <button onClick={handleSave}>Save</button>
//       <button onClick={() => navigate(`/attendance/${employee._id}`)}>View Attendance</button>
//     </div>
//   );
// };

// export default EmployeeCard;
