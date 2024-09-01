import express from 'express';
import {  isUserAuthenticated } from '../middlewares/auth.js';
import { deleteHealthCharacteristics, healthCharacteristicsGet, healthCharacteristicsPost, updateHealthCharacteristics } from '../controllers/healthCharacteristics.controllers.js';


const router = express.Router();

router.post('/post',isUserAuthenticated,healthCharacteristicsPost);

router.get('/info',isUserAuthenticated,healthCharacteristicsGet);

router.put('/update/:id',isUserAuthenticated,updateHealthCharacteristics);

router.delete('/deletePost/:id',isUserAuthenticated,deleteHealthCharacteristics);



export default router;