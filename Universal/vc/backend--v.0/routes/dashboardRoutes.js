const express = require('express');
const router = express.Router();
const {
  getStudentDashboard,
  getMentorDashboard,
  getParentDashboard
} = require('../controllers/dashboardController');

router.get('/student/:id', getStudentDashboard);
router.get('/mentor/:id', getMentorDashboard);
router.get('/parent/:id', getParentDashboard);

module.exports = router;
