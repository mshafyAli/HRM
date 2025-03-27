const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const employeeRoutes = require("./routes/employeeRoutes");
const attandanceRoutes = require("./routes/attandanceRoutes");
const candidateRoutes = require("./routes/candidateRoutes");



dotenv.config();

connectDB();

const app = express();


app.use(cors({
  origin: ["http://localhost:5173","https://port-folio-website-two.vercel.app","https://the-academians.au","http://localhost:3000"], // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE", 
  credentials: true, // Allow cookies to be sent
}));



app.use(cookieParser());
app.use(express.json());


app.use("/api/v1", employeeRoutes);
app.use("/api/v1", attandanceRoutes);
app.use("/api/v1", candidateRoutes);


app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running and this is the root test response!" });
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));