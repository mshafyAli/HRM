
import express from 'express'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors'
import connectDataBase from './db/mongoose.js';
import dotenv from 'dotenv'
// dotenv.config();


if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
      path: '.env',
    });
  }

// DataBase
connectDataBase();




const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
}));
// app.use("/",express.static("uploads"))
// app.use("/", (req, res) => {
//   res.send("Hello world!");
// });




app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


// Routes

import userRoutes from './controllers/userControllers.js'
// import employeeRoutes from './routes/employee.js'








app.use('/api/v1/user', userRoutes);
// app.use('/api/employees', employeeRoutes);



// Basic Route
app.get('/', (req, res) => res.send('HRM System API'));





// Start Server
// const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server running on port 5000`));
