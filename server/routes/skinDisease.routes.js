import express from 'express'

import { uploadImage } from "../controllers/skinDisease.controllers.js";
import { isUserAuthenticated} from '../middlewares/auth.js'

const router = express.Router();

router.post('/uploadImage', isUserAuthenticated, uploadImage)


export default router;