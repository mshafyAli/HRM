import Employee from '../models/Employee.js';

export const addEmployee = async (req, res) => {
    const { name, email, position, department, salary } = req.body;
    try {
        const newEmployee = new Employee({ name, email, position, department, salary });
        await newEmployee.save();
        res.json(newEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, position, department, salary } = req.body;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, email, position, department, salary }, { new: true });
        res.json(updatedEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await Employee.findByIdAndDelete(id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
