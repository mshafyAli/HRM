import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000/api/v1"; // Replace with actual API URL

// Async Thunks
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get(`${baseUrl}/employees`);
    return response.data;
  }
);



export const fetchEmployeeBasicDetails = createAsyncThunk(
  "employees/fetchEmployeeBasicDetails",
  async () => {
    const response = await axios.get(`${baseUrl}/employees/basic`);
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeData) => {
    const response = await axios.post(`${baseUrl}/employees`, employeeData);
    return response.data;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, employeeData }) => {
    await axios.put(`${baseUrl}/employees/${id}`, employeeData);
    return { id, employeeData };
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id) => {
    await axios.delete(`${baseUrl}/employees/${id}`);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    basicDetails: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (emp) => emp._id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload.employeeData;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp._id !== action.payload
        );
      })
      .addCase(fetchEmployeeBasicDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeBasicDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.basicDetails = action.payload;
      })
      .addCase(fetchEmployeeBasicDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
