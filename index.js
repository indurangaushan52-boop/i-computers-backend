import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import jwt from 'jsonwebtoken';
import authenticateUser from './middelewares/authentication.js';
import productRouter from './routers/productRouter.js';
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express();

const mongodbURI = process.env.MongoURI

mongoose.connect(mongodbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })

app.use(cors())

app.use(express.json());
app.use(authenticateUser)

app.use('/users', userRouter);
app.use('/products',productRouter)

app.listen(3000, () => {
  console.log(" Server running on port 3000");
});
