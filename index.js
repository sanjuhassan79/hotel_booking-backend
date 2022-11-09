import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js';
import users from './routes/users.js';
import hotels from './routes/hotels.js';
import rooms from './routes/rooms.js';

const app = express();
const PORT = 4000;
dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
// Or:
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASEURL);
    console.log('connectdb');
  } catch (error) {
    throw erro;
  }
};

mongoose.connection.on('disconnection', () => {
  console.log('mongoDB disconnection');
});
mongoose.connection.on('dconnection', () => {
  console.log('mongoDB connection');
});
app.use('/auth', authRoute);
app.use('/users', users);
app.use('/hotels', hotels);
app.use('/rooms', rooms);
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Someting wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(PORT, () => {
  connect();
  console.log(`Example app listening on port ${PORT}`);
});
