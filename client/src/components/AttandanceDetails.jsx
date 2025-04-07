// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { BiSolidReport } from "react-icons/bi";
// import Loader from "./Loader";

// const AttendanceDetails = () => {
//   const { employeeId } = useParams();
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [employeeInfo, setEmployeeInfo] = useState({
//     name: "",
//     department: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/v1/attandance/${employeeId}`
//         );
//         setAttendanceRecords(response.data);

//         if (response.data.length > 0 && response.data[0].employee) {
//           setEmployeeInfo({
//             name: response.data[0].employee.name || "Employee Name Missing",
//             department:
//               response.data[0].employee.department || "Department Missing",
//           });
//         } else {
//           setEmployeeInfo({
//             name: "Employee Name Missing",
//             department: "Department Missing",
//           });
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching attendance:", error);
//         setLoading(false);
//       }
//     };

//     fetchAttendance();
//   }, [employeeId]);

//   if (loading) return <Loader/>;
//   if (attendanceRecords.length === 0)
//     return <p>No attendance records found.</p>;

//   // Filter Records Based on Selected Date Range
//   const filteredRecords = attendanceRecords.filter((record) => {
//     const recordDate = new Date(record.date);
//     const fromDate = startDate ? new Date(startDate) : null;
//     const toDate = endDate ? new Date(endDate) : null;
//     return (
//       (!fromDate || recordDate >= fromDate) && (!toDate || recordDate <= toDate)
//     );
//   });

//   return (
//     <div className="max-w-6xl mx-auto px-4">
//       <div className="flex justify-between items-center my-6">
//         <Link to={"/"} >
//           <button className="py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center  px-2">
//             {" "}
//             <MdOutlineKeyboardBackspace size={20} />
//             Back
//           </button>
//         </Link>
//         <h2 className="text-2xl font-bold">
//           Attendance Details for {employeeInfo.name} ({employeeInfo.department})
//         </h2>
//         <button className="py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center  px-2">
//           <BiSolidReport size={20} />
//           Download
//         </button>
//       </div>
//       <div className="flex items-center space-x-4 mb-4">
//         <label className="flex flex-col">
//           Start Date:
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="border rounded p-2"
//           />
//         </label>
//         <label className="flex flex-col">
//           End Date:
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="border rounded p-2"
//           />
//         </label>
//       </div>

//       <table className="w-full mt-4 border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 border">Date</th>
//             <th className="p-2 border">Day</th>
//             <th className="p-2 border">Status</th>
//             <th className="p-2 border">In Time</th>
//             <th className="p-2 border">Out Time</th>
//             <th className="p-2 border">Working Hours</th>
//             <th className="p-2 border">Remarks</th>
//             <th className="p-2 border">Half Day</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredRecords.length > 0 ? (
//             filteredRecords.map((record) => (
//               <tr
//                 key={record._id}
//                 className={`text-center  ${
//                   record.status === "Holiday" ? "bg-green-400" : ""
//                 } ${record.halfDay ? "bg-yellow-500" : ""} `}
//               >
//                 <td className="p-2 border">
//                   {new Date(record.date).toISOString().split("T")[0]}
//                 </td>
//                 <td className="p-2 border">{record.day}</td>

//                 <td
//                   className={`p-2 border ${
//                     record.status === "Absent"
//                       ? "text-red-500"
//                       : "text-green-500"
//                   }`}
//                 >
//                   {record.status}
//                 </td>
//                 <td className="p-2 border">{record.inTime || "--"}</td>
//                 <td className="p-2 border">{record.outTime || "--"}</td>
//                 <td className="p-2 border">{record.workingHours || "--"}</td>
//                 <td className="p-2 border">{record.remarks || "--"}</td>
//                 <td className="p-2 border">{record.halfDay ? "Yes" : "No"}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className="text-center p-4">
//                 No records found for the selected date range.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//     </div>
//   );
// };

// export default AttendanceDetails;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import Loader from "../components/Loader"; // Adjust if your loader path is different

const AttendanceDetails = () => {
  const { employeeId } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    department: "",
  });
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [totalLeaveCount, setTotalLeaveCount] = useState(0);
  const [shiftCovered, setShiftCovered] = useState(0);
  const [shiftUncovered, setShiftUncovered] = useState(0);
  const [totalHalfDays, setTotalHalfDays] = useState(0);

  // Fetch attendance
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/attandance/${employeeId}`
        );
        setAttendanceRecords(response.data);

        if (response.data.length > 0 && response.data[0].employee) {
          setEmployeeInfo({
            name: response.data[0].employee.name || "Employee Name Missing",
            department:
              response.data[0].employee.department || "Department Missing",
          });
        } else {
          setEmployeeInfo({
            name: "Employee Name Missing",
            department: "Department Missing",
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  // Filtered records based on date range
  const filteredRecords = attendanceRecords.filter((record) => {
    const recordDate = new Date(record.date);
    const fromDate = startDate ? new Date(startDate) : null;
    const toDate = endDate ? new Date(endDate) : null;
    return (
      (!fromDate || recordDate >= fromDate) && (!toDate || recordDate <= toDate)
    );
  });

  // Update stats summary
  useEffect(() => {
    // const totalLeaves = filteredRecords.filter((rec) => rec.status === "Leave" || rec.status === "Absent" ).length;
    // const totalLeaves = filteredRecords.reduce((acc, rec) => {
    //   console.log("half Day", rec.halfDay, typeof rec.halfDay);
    //   if ((rec.status === "Leave" || rec.status === "Absent") && !rec.halfDay) {
    //     return acc + 1;
    //   } else if (
    //     (rec.status === "Leave" || rec.status === "Absent") &&
    //     rec.halfDay
    //   ) {
    //     return acc + 0.5;
    //   }
    //   return acc;
    // }, 0);

    // const totalLeaves = filteredRecords.reduce((acc, rec) => {
    //   const isLeaveOrAbsent = rec.status === "Leave" || rec.status === "Absent";
    //   const isHalfDay = rec.halfDay === true || rec.halfDay === "true" || rec.halfDay === 1 || rec.halfDay === "1";
  
    //   if (isLeaveOrAbsent) {
    //     return acc + (isHalfDay ? 0.5 : 1);
    //   }
  
    //   return acc;
    // }, 0);

    const totalLeaves = filteredRecords.reduce((acc, rec) => {
      const isLeaveOrAbsent = rec.status === "Leave" || rec.status === "Absent";
      const isHalfDayPresent = rec.status === "Present" && (
        rec.halfDay === true || rec.halfDay === "true" || rec.halfDay === 1 || rec.halfDay === "1"
      );
    
      if (isLeaveOrAbsent) {
        return acc + 1;
      }
    
      if (isHalfDayPresent) {
        return acc + 0.5;
      }
    
      return acc;
    }, 0);
    
    
    
  

    const covered = filteredRecords.filter(
      (rec) => rec.inTime && rec.outTime
    ).length;
    const uncovered = filteredRecords.length - covered;
    const halfDays = filteredRecords.filter((rec) => rec.halfDay).length;

    setTotalLeaveCount(totalLeaves);
    setShiftCovered(covered);
    setShiftUncovered(uncovered);
    setTotalHalfDays(halfDays);
  }, [filteredRecords]);

  if (loading) return <Loader />;
  if (attendanceRecords.length === 0)
    return <p>No attendance records found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center my-6 flex-wrap gap-2">
        <Link to={"/"}>
          <button className="py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center px-2">
            <MdOutlineKeyboardBackspace size={20} />
            Back
          </button>
        </Link>
        <h2 className="text-2xl font-bold">
          Attendance Details for {employeeInfo.name} ({employeeInfo.department})
        </h2>
        <button className="py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center px-2">
          <BiSolidReport size={20} />
          Download
        </button>
      </div>

      {/* Date Filter */}
      <div className="flex items-center space-x-4 mb-4">
        <label className="flex flex-col">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-2"
          />
        </label>
        <label className="flex flex-col">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2"
          />
        </label>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 text-sm md:text-base font-medium">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p>Total Leaves</p>
          <p className="font-bold text-blue-700">
            {totalLeaveCount}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <p>Shift Covered</p>
          <p className="font-bold text-green-700">{shiftCovered}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <p>Shift Uncovered</p>
          <p className="font-bold text-red-700">{shiftUncovered}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p>Half Days</p>
          <p className="font-bold text-yellow-700">{totalHalfDays}</p>
        </div>
      </div>

      {/* Attendance Table */}
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Day</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">In Time</th>
            <th className="p-2 border">Out Time</th>
            <th className="p-2 border">Working Hours</th>
            <th className="p-2 border">Remarks</th>
            <th className="p-2 border">Half Day</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <tr
                key={record._id}
                className={`text-center ${
                  record.status === "Holiday"
                    ? "bg-green-400"
                    : record.halfDay
                    ? "bg-yellow-500"
                    : ""
                }`}
              >
                <td className="p-2 border">
                  {new Date(record.date).toISOString().split("T")[0]}
                </td>
                <td className="p-2 border">{record.day}</td>
                <td
                  className={`p-2 border ${
                    record.status === "Absent"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {record.status}
                </td>
                <td className="p-2 border">{record.inTime || "--"}</td>
                <td className="p-2 border">{record.outTime || "--"}</td>
                <td className="p-2 border">{record.workingHours || "--"}</td>
                <td className="p-2 border">{record.remarks || "--"}</td>
                <td className="p-2 border">{record.halfDay ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No records found for the selected date range.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceDetails;
