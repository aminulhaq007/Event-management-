import express from 'express';
import {
  createRegistration,
  getAllRegistrations,
  deleteRegistration
} from '../controllers/registrationController.js';

const router = express.Router();

router.route('/')
  .post(createRegistration)
  .get(getAllRegistrations);

router.route('/:id')
  .delete(deleteRegistration);

export default router;