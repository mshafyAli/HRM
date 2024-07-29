// src/pages/ActivityManager.jsx
import  { useState } from "react";

const ActivityManager = () => {
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
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
      setActivities(
        activities.map((activity) =>
          activity.id === currentId ? { ...formData, id: currentId } : activity
        )
      );
      setEditMode(false);
      setCurrentId(null);
    } else {
      setActivities([...activities, { ...formData, id: Date.now() }]);
    }
    setFormData({ title: "", description: "", date: "", status: "" });
  };

  const handleEdit = (id) => {
    const activity = activities.find((activity) => activity.id === id);
    setFormData(activity);
    setEditMode(true);
    setCurrentId(id);
  };

  const handleDelete = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <header className="bg-indigo-500 p-4">
          <h1 className="text-white text-2xl font-semibold">
            Activity Manager
          </h1>
        </header>
        <div className="p-6">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Activity" : "Add Activity"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Activity Title"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Activity Description"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
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
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="sm:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                >
                  {editMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Activity Records</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              {activities.length === 0 ? (
                <p className="text-gray-700">No activity records.</p>
              ) : (
                <ul>
                  {activities.map((activity) => (
                    <li
                      key={activity.id}
                      className="mb-4 p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
                    >
                      <div>
                        <p>
                          <strong>Title:</strong> {activity.title}
                        </p>
                        <p>
                          <strong>Description:</strong> {activity.description}
                        </p>
                        <p>
                          <strong>Date:</strong> {activity.date}
                        </p>
                        <p>
                          <strong>Status:</strong> {activity.status}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleEdit(activity.id)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(activity.id)}
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

export default ActivityManager;
