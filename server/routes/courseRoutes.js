import { Router } from 'express';
import { getCourses, getCourse, createCourse } from '../controllers/courseController.js';

const router = Router();

router
    .route('/')
    .get(getCourses)
    .post(createCourse);

router
    .route('/:id')
    .get(getCourse);

export default router;
