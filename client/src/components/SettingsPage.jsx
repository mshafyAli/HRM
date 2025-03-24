


import { useState } from "react";

export default function AttendanceCards() {

  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [employees, setEmployees] = useState([
    {
      id: "1",
      name: "John Smith",
      department: "Engineering",
      position: "Senior Developer",
      status: "Present",
      inTime: "02:23 PM",
      outTime: "05:30 PM",
      workingHours: "3h 7m",
      remarks: "On time",
      halfDay: false,
     
    },
    {
      id: "2",
      name: "Sarah Johnson",
      department: "Marketing",
      position: "Marketing Manager",
      status: "Present",
      inTime: "09:15 AM",
      outTime: "06:00 PM",
      workingHours: "8h 45m",
      remarks: "Team meeting at 10 AM",
      halfDay: false,
    },
    {
      id: "3",
      name: "Michael Brown",
      department: "Finance",
      position: "Financial Analyst",
      status: "Present",
      inTime: "08:30 AM",
      outTime: "05:15 PM",
      workingHours: "8h 45m",
      remarks: "",
      halfDay: false,
    },
    {
      id: "4",
      name: "Emily Davis",
      department: "Human Resources",
      position: "HR Specialist",
      status: "Late",
      inTime: "10:15 AM",
      outTime: "06:30 PM",
      workingHours: "8h 15m",
      remarks: "Traffic delay",
      halfDay: false,
    },
    {
      id: "5",
      name: "David Wilson",
      department: "Sales",
      position: "Sales Representative",
      status: "Absent",
      inTime: "08:30 AM",
      outTime: "05:15 PM",
      workingHours: "-",
      remarks: "Sick leave",
      halfDay: false,
    },
    {
      id: "6",
      name: "Jennifer Taylor",
      department: "Customer Support",
      position: "Support Specialist",
      status: "Present",
      inTime: "09:00 AM",
      outTime: "05:45 PM",
      workingHours: "8h 45m",
      remarks: "",
      halfDay: false,
    },
  ]);

  const handleInputChange = (employeeId, field, value) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.id === employeeId) {
        const updatedEmployee = { ...emp, [field]: value };

        // Check if both inTime and outTime are filled
        if (updatedEmployee.inTime && updatedEmployee.outTime) {
          updatedEmployee.workingHours = calculateWorkingHours(
            updatedEmployee.inTime,
            updatedEmployee.outTime
          );
        } else {
          updatedEmployee.workingHours = "-";
        }

        return updatedEmployee;
      }
      return emp;
    });

    setEmployees(updatedEmployees);
  };

  // ✅ WORKING calculateWorkingHours function
  const calculateWorkingHours = (inTimeStr, outTimeStr) => {
    if (!inTimeStr || !outTimeStr) return "-";

    const [inHours, inMinutes] = inTimeStr.split(":").map((t) => parseInt(t));
    const [outHours, outMinutes] = outTimeStr
      .split(":")
      .map((t) => parseInt(t));

    // Handle cases where parsing fails
    if (
      isNaN(inHours) ||
      isNaN(inMinutes) ||
      isNaN(outHours) ||
      isNaN(outMinutes)
    ) {
      return "-";
    }

    const inTotalMinutes = inHours * 60 + inMinutes;
    const outTotalMinutes = outHours * 60 + outMinutes;

    // Out time should be after in time
    if (outTotalMinutes <= inTotalMinutes) return "-";

    const diffMinutes = outTotalMinutes - inTotalMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  // Handle save attendance
  const handleSaveAttendance = (id) => {
    console.log(`Saving attendance for employee ${id}`);
    // In a real app, you would send this data to your backend
  };

  return (
    <div className="max-w-5xl mx-auto">
       <div className="flex justify-center items-center gap-2 pt-6">
            <h1 className="text-sm font-bold">Select Date:</h1>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-auto px-2 py-1" />
          </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="p-4">
              {/* Header with name and status */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {employee.name}
                </h3>
              </div>

              {/* Department and position */}
              <p className="text-sm text-gray-600 mb-4">
                {employee.department} • {employee.position}
              </p>

              {/* Time tracking section */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">In Time</p>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={employee.inTime}
                      onChange={(e) =>
                        handleInputChange(employee.id, "inTime", e.target.value)
                      }
                      disabled={employee.status === "Leave" || employee.status === "Absent"}
                      
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="ml-2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Out Time</p>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={employee.outTime}
                      onChange={(e) =>
                        handleInputChange(
                          employee.id,
                          "outTime",
                          e.target.value
                        )
                      }
                      disabled={employee.status === "Leave" || employee.status === "Absent"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="ml-2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="mr-2 text-sm">Status:</label>
                  <select
                    value={employee.status}
                    onChange={(e) =>
                      handleInputChange(employee.id, "status", e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={employee.halfDay}
                    disabled={employee.status === "Leave" || employee.status === "Absent"}
                    onChange={(e) =>
                      handleInputChange(
                        employee.id,
                        "halfDay",
                        e.target.checked
                      )
                    }
                  />
                  <label className="text-sm">Half Day</label>
                </div>
              </div>

              {/* Remarks section */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  
                  <p className="text-xs text-gray-500">Remarks</p>
                  {employee.status === "Present" ? ( 
                 <>
                  <p className="text-xs text-gray-500">
                    Working Hours: {employee.workingHours}
                  </p>
                 </>
                ):(null)}
                </div>
                <input
                  type="text"
                  value={employee.remarks}
                  onChange={(e) =>
                    handleInputChange(employee.id, "remarks", e.target.value)
                  }
                  placeholder="Add remarks..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Save button */}
              <button
                onClick={() => handleSaveAttendance(employee.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Save Attendance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
