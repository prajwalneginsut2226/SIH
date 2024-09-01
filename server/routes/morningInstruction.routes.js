import express from 'express';
import { isUserAuthenticated, isAuthenticated } from '../middlewares/auth.js';
import { deleteInstruction, getAllInstructions, postInstruction } from '../controllers/morningInstructions.controllers.js';
import redisCache from '../database/redis.js';

const router  = express.Router();

router.post('/postInstruction',isAuthenticated,postInstruction);
router.get('/getAllInstructions',getAllInstructions);
router.delete('/deleteInstruction/:id',isAuthenticated,deleteInstruction);

redisCache.del('/api/v1/instructionAboutHealth/getAllInstructions',(err)=>{
    if(err){
        throw err;
    }
})


export default router;