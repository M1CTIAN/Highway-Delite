const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');

// GET /api/experiences - Get all experiences
router.get('/', experienceController.getAllExperiences);

// GET /api/experiences/:id - Get experience by ID with slots
router.get('/:id', experienceController.getExperienceById);

module.exports = router;
