// src/pages/CandidatesManager.jsx
import { useState } from "react";
import { FiUsers, FiUserPlus, FiCalendar, FiBarChart2 } from "react-icons/fi";

const CandidatesManager = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    status: "",
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
      <div className="max-w-4xl mx-auto  rounded-lg shadow-md overflow-hidden">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          {[
            {
              title: "Total Employees",
              icon: FiUsers,
              value: "245",
              description: "+12 from last month",
            },
            {
              title: "Open Positions",
              icon: FiUserPlus,
              value: "15",
              description: "+3 from last month",
            },
            {
              title: "Pending Leave Requests",
              icon: FiCalendar,
              value: "8",
              description: "-2 from last week",
            },
            {
              title: "Turnover Rate",
              icon: FiBarChart2,
              value: "4.2%",
              description: "-0.5% from last quarter",
            },
          ].map((card, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-sm font-medium">{card.title}</h3>
                <card.icon className="h-4 w-4 text-gray-500" />
              </div>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-gray-500">{card.description}</p>
            </div>
          ))}
        </div>

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
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
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
              {candidates.length === 0 ? (
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
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CandidatesManager;
