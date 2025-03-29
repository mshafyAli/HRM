


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AttendanceDetails = () => {
  const { employeeId } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState({ name: "", department: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/attandance/${employeeId}`);
        setAttendanceRecords(response.data);

        if (response.data.length > 0 && response.data[0].employee) {
          setEmployeeInfo({
            name: response.data[0].employee.name || "Employee Name Missing",
            department: response.data[0].employee.department || "Department Missing",
          });
        } else {
          setEmployeeInfo({ name: "Employee Name Missing", department: "Department Missing" });
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  if (loading) return <p>Loading attendance records...</p>;
  if (attendanceRecords.length === 0) return <p>No attendance records found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold">
        Attendance Details for {employeeInfo.name} ({employeeInfo.department})
      </h2>
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
          {attendanceRecords.map((record) => (
            <tr key={record._id} className={`text-center  ${record.status === "Holiday" ? "bg-green-400" : ""} ${record.halfDay ? "bg-yellow-500" : ""} `}>
              <td className="p-2 border">{new Date(record.date).toISOString().split("T")[0]}</td>
              <td className="p-2 border">{record.day}</td>

              <td className={`p-2 border ${record.status === "Absent" ? "text-red-500" : "text-green-500"}`}>
                {record.status}
              </td>
              <td className="p-2 border">{record.inTime || "--"}</td>
              <td className="p-2 border">{record.outTime || "--"}</td>
              <td className="p-2 border">{record.workingHours || "--"}</td>
              <td className="p-2 border">{record.remarks || "--"}</td>
              <td className="p-2 border">{record.halfDay ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceDetails;
