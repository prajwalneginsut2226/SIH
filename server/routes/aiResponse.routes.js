import express from 'express';

import {isAuthenticated, isUserAuthenticated} from '../middlewares/auth.js'

import rateLimit from 'express-rate-limit';
import { generateAi } from '../controllers/ai.controllers.js';

const router = express.Router();

const responseLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5, 
    message: "Too many accounts created from this IP, please try again after 15 minutes"
  });

router.get('/getAIResponse',isUserAuthenticated,responseLimiter,generateAi)



export default router;