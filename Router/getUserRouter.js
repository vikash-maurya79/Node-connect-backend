import Router from 'express';
import { getUser } from '../Controller/getInterviewerController/getInterviewerController.js';
import { getInterviewee } from '../Controller/getIntervieweeController/getIntervieweeController.js';
import { authMiddleware } from '../Utils/authMiddleware.js';
const router = Router();
router.get('/interviewer', authMiddleware, getUser);
router.get('/interviewee', authMiddleware, getInterviewee);



export default router;