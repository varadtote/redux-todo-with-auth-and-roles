import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connectDB from "./utils/dbconnection.js";
import cors from 'cors'
dotenv.config()
const PORT = process.env.PORT || 8000;

connectDB(process.env.MONGO_URI)
const app = express()

// middlewares
// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.status(200).json({ message: 'app working' });
})

// routes
import todoRoute from './routes/todoRoute.js'
import authRoute from './routes/authRoute.js'


// route handlers
app.use('/api/todo', todoRoute)
app.use('/api/auth', authRoute)


app.listen(PORT, () => console.log(`server running on ${PORT}`))