import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AttandanceDetails = () => {
  const { employeeId } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/attandance/${employeeId}`);
        console.log(response.data);
        setAttendanceRecords(response.data.attendance); // Assuming `attendance` is an array
        setEmployee(response.data.employee);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch attendance details");
      }
      setLoading(false);
    };

    fetchAttendance();
  }, [employeeId]);

  if (loading) return <p>Loading attendance details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{employee?.name}'s Attendance</h2>
      <p className="text-gray-600">{employee?.department} - {employee?.position}</p>

      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record.id}>
              <td className="border border-gray-300 px-4 py-2">{record.date}</td>
              <td className="border border-gray-300 px-4 py-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttandanceDetails;
