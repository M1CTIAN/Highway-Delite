const Experience = require('../models/Experience');

const experienceController = {
  // GET /api/experiences - Get all experiences
  getAllExperiences: async (req, res) => {
    try {
      const experiences = await Experience.findAllWithSlots();
      
      res.status(200).json({
        success: true,
        count: experiences.length,
        data: experiences
      });
    } catch (error) {
      console.error('Error fetching experiences:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch experiences',
        error: error.message
      });
    }
  },

  // GET /api/experiences/:id - Get experience by ID with slots
  getExperienceById: async (req, res) => {
    try {
      const { id } = req.params;
      const experience = await Experience.findByIdWithSlots(id);

      if (!experience) {
        return res.status(404).json({
          success: false,
          message: 'Experience not found'
        });
      }

      res.status(200).json({
        success: true,
        data: experience
      });
    } catch (error) {
      console.error('Error fetching experience:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch experience',
        error: error.message
      });
    }
  }
};

module.exports = experienceController;
