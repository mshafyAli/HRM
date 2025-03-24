// src/pages/CandidatesManager.jsx
import { useState } from "react";

const CandidatesManager = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    status: "",
    date: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setCandidates(
        candidates.map((candidate) =>
          candidate.id === currentId
            ? { ...formData, id: currentId }
            : candidate
        )
      );
      setEditMode(false);
      setCurrentId(null);
    } else {
      setCandidates([...candidates, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: "", email: "", phone: "", position: "", status: "" });
  };

  const handleEdit = (id) => {
    const candidate = candidates.find((candidate) => candidate.id === id);
    setFormData(candidate);
    setEditMode(true);
    setCurrentId(id);
  };

  const handleDelete = (id) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <header className="bg-primary p-4">
          <h1 className="text-white text-2xl font-semibold">
            Candidates Manager
          </h1>
        </header>
        <div className="p-6">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Candidate" : "Add Candidate"}
            </h2>
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
                  placeholder="Candidate Name"
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
                  placeholder="Candidate Email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Candidate Phone"
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
                  placeholder="Position Applied For"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700">Date</label>
                <input
                  type="text"
                  name="position"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Position Applied For"
                  required
                />
              </div>
              <div className="sm:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  {editMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Candidate Records</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <h3>Total Employees: {candidates.length}</h3>
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
                  {candidates.length > 0 ? (
                    candidates.map((emp, index) => (
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

              {/* {candidates.length === 0 ? (
                <p className="text-gray-700">No candidate records available.</p>
              ) : (
                <ul>
                  {candidates.map((candidate) => (
                    <li
                      key={candidate.id}
                      className="mb-4 p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
                    >
                      <div>
                        <p>
                          <strong>Name:</strong> {candidate.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {candidate.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {candidate.phone}
                        </p>
                        <p>
                          <strong>Position:</strong> {candidate.position}
                        </p>
                        <p>
                          <strong>Status:</strong> {candidate.status}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleEdit(candidate.id)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(candidate.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )} */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CandidatesManager;
