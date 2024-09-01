import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cloudinary from "cloudinary";
import { errorMiddleware } from './utils/errorMiddleware.js';
import database from './database/dbConnection.js';
import rateLimit from 'express-rate-limit';

import { Server } from 'socket.io';
import {createServer} from 'http';

import { createAdapter } from '@socket.io/redis-streams-adapter';
import redis from './config/redis.config.js';
import {instrument} from '@socket.io/admin-ui'

import adminRouter from './routes/admin.routes.js';
import partnerWithUsRouter from './routes/partnerWithUs.routes.js';
import userRouter from './routes/user.routes.js';
import connectWithUsRouter from './routes/connectWithUs.routes.js'
import feedbackRouter from './routes/feedback.routes.js';
import healthBlogRouter from './routes/healthBlog.routes.js';
import healthCharacteristicsRouter from './routes/healthCharacteristics.routes.js';
import morningInstructionRouter from './routes/morningInstruction.routes.js';
import patientRouter from './routes/patient.routes.js'
import skinDiseaseRouter from './routes/skinDisease.routes.js'
import aiResponseRouter from './routes/aiResponse.routes.js'

import { setupSocket } from './ws/socket.js';

import helmet from 'helmet';
import sanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import compression from 'compression'


import { spawn } from 'child_process';

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin:[ "http://localhost:5173", "https://admin.socket.io", "http://localhost:5174"],
    // methods: ["GET", "POST"],
    credentials: true
  },
  // adapter:createAdapter(redis)
})

// instrument(io, {
//   auth: false,
//   mode:"development"
// })


setupSocket(io);
export{ io };

app.use(helmet());

app.use(express.json({ limit: '5kb' }));
app.use(sanitize());
app.use(xss());
app.use(hpp());
app.use(express.urlencoded({ extended: true, limit: '5kb' }));
app.use(compression({
  level: 6,
  threshold: 10 * 1000,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
}));


const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 1000, 
  message: "Too many accounts created from this IP, please try again after 1 Hour"
});

app.use(limiter)

dotenv.config();
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/partnerWithUs', partnerWithUsRouter);
app.use('/api/v1/connect', connectWithUsRouter);
app.use('/api/v1/feedback', feedbackRouter);
app.use('/api/v1/healthBlog',healthBlogRouter);
app.use('/api/v1/healthCharacteristics', healthCharacteristicsRouter);
app.use('/api/v1/morningInstructions', morningInstructionRouter);
app.use('/api/v1/patient',patientRouter);
app.use('/api/v1/skinDisease',skinDiseaseRouter);
app.use('/api/v1/aiResponse', aiResponseRouter)


app.post('/predict', (req, res) => {
  const {Disease, Fever, Cough, Fatigue, Difficulty_Breathing, Age, Gender, Blood_Pressure, Cholestrol_Level } = req.body;

  const python = spawn('python', ['predict.py', JSON.stringify(symptoms)]);

  python.stdout.on('data', (data) => {
      res.json({ prediction: data.toString() });
  });

  python.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
  });
});


database();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server is running");
})