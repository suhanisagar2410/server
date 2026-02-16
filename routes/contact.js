import express from 'express';
import { body, validationResult } from 'express-validator';
import { submitContact, getAllContacts } from '../controllers/contactController.js';

const router = express.Router();

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('message')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters long'),
];

// POST: Submit contact form
router.post('/', validateContact, submitContact);

// GET: Retrieve all contacts (for admin purposes)
router.get('/', getAllContacts);

export default router;
