// src/pages/SalaryManaging.jsx
import  { useState } from "react";

const SalaryManaging = () => {
  const [salaries, setSalaries] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: "",
    baseSalary: "",
    bonuses: "",
    deductions: "",
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
      setSalaries(
        salaries.map((salary) =>
          salary.id === currentId ? { ...formData, id: currentId } : salary
        )
      );
      setEditMode(false);
      setCurrentId(null);
    } else {
      setSalaries([...salaries, { ...formData, id: Date.now() }]);
    }
    setFormData({
      employeeName: "",
      baseSalary: "",
      bonuses: "",
      deductions: "",
    });
  };

  const handleEdit = (id) => {
    const salary = salaries.find((salary) => salary.id === id);
    setFormData(salary);
    setEditMode(true);
    setCurrentId(id);
  };

  const handleDelete = (id) => {
    setSalaries(salaries.filter((salary) => salary.id !== id));
  };

  const calculateTotal = (salary) => {
    return (
      Number(salary.baseSalary) +
      Number(salary.bonuses) -
      Number(salary.deductions)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <header className="bg-blue-500 p-4">
          <h1 className="text-white text-2xl font-semibold">
            Salary Management
          </h1>
        </header>
        <div className="p-6">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Salary" : "Add Salary"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <div>
                <label className="block text-gray-700">Employee Name</label>
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Base Salary</label>
                <input
                  type="number"
                  name="baseSalary"
                  value={formData.baseSalary}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="50000"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Bonuses</label>
                <input
                  type="number"
                  name="bonuses"
                  value={formData.bonuses}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="5000"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Deductions</label>
                <input
                  type="number"
                  name="deductions"
                  value={formData.deductions}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="2000"
                  required
                />
              </div>
              <div className="sm:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {editMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Salary Records</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              {salaries.length === 0 ? (
                <p className="text-gray-700">No salary records.</p>
              ) : (
                <ul>
                  {salaries.map((salary) => (
                    <li
                      key={salary.id}
                      className="mb-4 p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
                    >
                      <div>
                        <p>
                          <strong>Employee Name:</strong> {salary.employeeName}
                        </p>
                        <p>
                          <strong>Base Salary:</strong> ${salary.baseSalary}
                        </p>
                        <p>
                          <strong>Bonuses:</strong> ${salary.bonuses}
                        </p>
                        <p>
                          <strong>Deductions:</strong> ${salary.deductions}
                        </p>
                        <p>
                          <strong>Total Salary:</strong> $
                          {calculateTotal(salary)}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleEdit(salary.id)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(salary.id)}
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

export default SalaryManaging;
