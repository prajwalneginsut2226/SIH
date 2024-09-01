import express from 'express';

import { createPatient, deletePatient, getParticularPatient, getPatients } from '../controllers/patient.controllers.js';
import {isAuthenticated, isUserAuthenticated} from '../middlewares/auth.js'


const router = express.Router();


router.post('/createPatient',isUserAuthenticated,createPatient)

router.delete('/deletePatient',isUserAuthenticated,deletePatient);

router.get('/getPatientProfile',isUserAuthenticated,getParticularPatient);

router.get('/getPatients',isAuthenticated,getPatients);




export default router;