// src/pages/LeavesPlanner.jsx
import  { useState } from "react";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLeaves([...leaves, { ...formData, id: Date.now() }]);
    setFormData({ startDate: "", endDate: "", reason: "" });
  };

  const handleDelete = (id) => {
    setLeaves(leaves.filter((leave) => leave.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <header className="bg-green-500 p-4">
          <h1 className="text-white text-2xl font-semibold">Leaves Planner</h1>
        </header>
        <div className="p-6">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Request Leave</h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <div>
                <label className="block text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-700">Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Reason for leave"
                  required
                />
              </div>
              <div className="sm:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              {leaves.length === 0 ? (
                <p className="text-gray-700">No leave requests.</p>
              ) : (
                <ul>
                  {leaves.map((leave) => (
                    <li
                      key={leave.id}
                      className="mb-4 p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
                    >
                      <div>
                        <p>
                          <strong>Start Date:</strong> {leave.startDate}
                        </p>
                        <p>
                          <strong>End Date:</strong> {leave.endDate}
                        </p>
                        <p>
                          <strong>Reason:</strong> {leave.reason}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(leave.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
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

export default Leaves;
