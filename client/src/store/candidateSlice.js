import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000/api/v1"; // Replace with actual API URL

// Async Thunks
export const fetchCandidates = createAsyncThunk("candidates/fetchCandidates", async () => {
  const response = await axios.get(`${baseUrl}/candidates`);
  return response.data;
});

export const addCandidate = createAsyncThunk("candidates/addCandidate", async (candidateData) => {
  const response = await axios.post(`${baseUrl}/candidates`, candidateData);
  return response.data;
});

export const updateCandidate = createAsyncThunk("candidates/updateCandidate", async ({ id, candidateData }) => {
  await axios.put(`${baseUrl}/candidates/${id}`, candidateData);
  return { id, candidateData };
});

export const deleteCandidate = createAsyncThunk("candidates/deleteCandidate", async (id) => {
  await axios.delete(`${baseUrl}/candidates/${id}`);
  return id;
});

const candidateSlice = createSlice({
  name: "candidates",
  initialState: {
    candidates: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCandidate.fulfilled, (state, action) => {
        state.candidates.push(action.payload);
      })
      .addCase(updateCandidate.fulfilled, (state, action) => {
        const index = state.candidates.findIndex((cand) => cand._id === action.payload.id);
        if (index !== -1) {
          state.candidates[index] = action.payload.candidateData;
        }
      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        state.candidates = state.candidates.filter((cand) => cand._id !== action.payload);
      });
  },
});

export default candidateSlice.reducer;
