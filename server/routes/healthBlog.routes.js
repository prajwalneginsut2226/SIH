import express from 'express';
import { isUserAuthenticated } from '../middlewares/auth.js';
import {blogPost,deleteBlog,getAllBlogs,getMyBlogs,updateBlog} from '../controllers/healthBlog.controller.js'
import redisCache from '../database/redis.js';

const router = express.Router();

router.post('/createBlog',isUserAuthenticated,blogPost);

router.delete('/deleteBlog/:id',isUserAuthenticated,deleteBlog);

router.get('/getAllBlogs', redisCache.route({expire:60*30}),getAllBlogs);
router.get('/getUserBlog', isUserAuthenticated,getMyBlogs);

router.put('/updateBlog/:id',isUserAuthenticated,updateBlog);

redisCache.del('/api/v1/healthBlog/getAllBlogs',(err)=>{
    if(err){
        throw err;
    }
})



export default router;