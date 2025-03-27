import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000/api/v1"; // Replace with actual API URL

// Thunks (add the ones we created above)
export const fetchAttandance = createAsyncThunk(
  "attandance/fetchAttandance",
  async () => {
    const response = await axios.get(`${baseUrl}/attandance`);
    return response.data;
  }
);

export const fetchAttandanceById = createAsyncThunk(
  "attandance/fetchAttandanceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/attandance/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch attendance by ID");
    }
  }
);

export const createAttandance = createAsyncThunk(
  "attandance/createAttandance",
  async (attandanceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/attandance`, attandanceData);
      console.log(response.data)
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create attandance");
    }
  }
);

export const updateAttandance = createAsyncThunk(
  "attandance/updateAttandance",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseUrl}/attandance/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update attandance");
    }
  }
);

export const deleteAttandance = createAsyncThunk(
  "attandance/deleteAttandance",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/attandance/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete attandance");
    }
  }
);

// const attandanceSlice = createSlice({
//   name: "attandance",
//   initialState: {
//     attandance: [],
//     selectedAttendance: null,
//     status: "idle",
    
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Attendance
//       .addCase(fetchAttandance.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchAttandance.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.attandance = action.payload;
//       })
//       .addCase(fetchAttandance.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
      
//       // Fetch Attendance by ID
//       .addCase(fetchAttandanceById.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchAttandanceById.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.selectedAttandance = action.payload; // Store fetched attendance in state
//       })
//       .addCase(fetchAttandanceById.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Create Attendance
//       .addCase(createAttandance.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(createAttandance.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.attandance.push(action.payload);
//       })
//       .addCase(createAttandance.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Update Attendance
//       .addCase(updateAttandance.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(updateAttandance.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const index = state.attandance.findIndex((rec) => rec.id === action.payload.id);
//         if (index !== -1) {
//           state.attandance[index] = action.payload;
//         }
//       })
//       .addCase(updateAttandance.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Delete Attendance
//       .addCase(deleteAttandance.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteAttandance.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.attandance = state.attandance.filter((record) => record.id !== action.payload);
//       })
//       .addCase(deleteAttandance.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

const attandanceSlice = createSlice({
  name: "attandance",
  initialState: {
    attandance: [], // Ensure it's always an array
    // selectedAttendance: null, // Fixed typo
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Attendance
      .addCase(fetchAttandance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAttandance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attandance = action.payload || []; // Ensure it's an array
      })
      .addCase(fetchAttandance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Attendance by ID
      .addCase(fetchAttandanceById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAttandanceById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedAttendance = action.payload; // Fixed typo
      })
      .addCase(fetchAttandanceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Create Attendance
      .addCase(createAttandance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAttandance.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!Array.isArray(state.attandance)) {
          state.attandance = []; // Ensure it's an array before pushing
        }
        state.attandance.push(action.payload);
      })
      .addCase(createAttandance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Attendance
      .addCase(updateAttandance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAttandance.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.attandance?.findIndex((rec) => rec.id === action.payload.id);
        if (index !== -1 && index !== undefined) {
          state.attandance[index] = action.payload;
        }
      })
      .addCase(updateAttandance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Attendance
      .addCase(deleteAttandance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAttandance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attandance = state.attandance?.filter((record) => record.id !== action.payload) || [];
      })
      .addCase(deleteAttandance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default attandanceSlice.reducer;




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const baseUrl = "http://localhost:5000/api/v1"; // Replace with actual API URL

// // Async Thunks
// // Thunks (add the ones we created above)
// export const fetchAttandance = createAsyncThunk(
//   "attandance/fetchAttandance",
//   async () => {
//     const response = await axios.get(`${baseUrl}/attandance`);
//     return response.data;
//   }
// );

// export const fetchAttandanceById = createAsyncThunk(
//   "attandance/fetchAttandanceById",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${baseUrl}/attandance/${id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch attendance by ID");
//     }
//   }
// );

// export const createAttandance = createAsyncThunk(
//   "attandance/createAttandance",
//   async (attandanceData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${baseUrl}/attandance`, attandanceData);
//       console.log(response.data)
//       return response.data;
      
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to create attandance");
//     }
//   }
// );

// export const updateAttandance = createAsyncThunk(
//   "attandance/updateAttandance",
//   async ({ id, updatedData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${baseUrl}/attandance/${id}`, updatedData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to update attandance");
//     }
//   }
// );

// export const deleteAttandance = createAsyncThunk(
//   "attandance/deleteAttandance",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${baseUrl}/attandance/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to delete attandance");
//     }
//   }
// );

// const attandanceSlice = createSlice({
//   name: "attandances",
//   initialState: {
//     attandances: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAttandance.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAttandance.fulfilled, (state, action) => {
//         state.loading = false;
//         state.attandances = action.payload;
//       })
//       .addCase(fetchAttandance.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(fetchAttandanceById.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAttandanceById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.attandances = action.payload;
//       })
//       .addCase(fetchAttandanceById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(createAttandance.fulfilled, (state, action) => {
//         state.attandances.push(action.payload);
//       })
//       .addCase(updateAttandance.fulfilled, (state, action) => {
//         const index = state.attandances.findIndex(
//           (emp) => emp._id === action.payload.id
//         );
//         if (index !== -1) {
//           state.attandances[index] = action.payload.updatedData;
//         }
//       })
      
   
//   },
// });

// export default attandanceSlice.reducer;
