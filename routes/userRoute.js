const express = require('express');
const router = express.Router();
const { report, addReports } = require('../controllers/userController.js')

router.get('/reports/:reportId', report)
router.post('/reports', addReports)

module.exports = router;