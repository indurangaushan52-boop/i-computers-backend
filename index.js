import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routers/studentRouter.js';
import userRouter from './routers/userRouter.js';
import jwt from 'jsonwebtoken';
import authenticateUser from './middelewares/authentication.js';
import productRouter from './routers/productRouter.js';

const app = express();

const mongodbURI = "mongodb://indurangaushan52_db_user:1234@ac-cnpky7s-shard-00-00.8embsvz.mongodb.net:27017,ac-cnpky7s-shard-00-01.8embsvz.mongodb.net:27017,ac-cnpky7s-shard-00-02.8embsvz.mongodb.net:27017/icomputers?ssl=true&replicaSet=atlas-3rud91-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(mongodbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })

app.use(express.json());
app.use(authenticateUser)

app.use('/students', studentRouter);
app.use('/users', userRouter);
app.use('/products',productRouter)

app.listen(3000, () => {
  console.log(" Server running on port 3000");
});
