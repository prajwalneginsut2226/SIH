import express from 'express';

import {isAuthenticated} from '../middlewares/auth.js'
import { getParticularAdmin, logOutAdmin, loginAdmin, registerAdmin, updateAdminDetails, updateAdminPassword } from '../controllers/admin.controllers.js';
import { createPatient } from '../controllers/patient.controllers.js';

const router = express.Router();


router.post('/registerAdmin',registerAdmin)
router.post('/loginAdmin',loginAdmin);
router.get('/logOutAdmin',isAuthenticated,logOutAdmin);

router.post('createPatientByAdmin', isAuthenticated,createPatient);

router.get('/getAdminProfile',isAuthenticated,getParticularAdmin);


router.put('/updateAdminDetails',isAuthenticated,updateAdminDetails);
router.put('/updateAdminPassword',isAuthenticated,updateAdminPassword);



export default router;