import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// Route Imports

import userRoutes from './routes/user.js'


dotenv.config();
const app = express();
app.use(express.json());



//Routes Middleware
app.use('/api', userRoutes);



//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser());



// MONGOOSE SETUP
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
