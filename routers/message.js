const express = require('express');
const messageController = require('../controllers/message');
const authController = require('../middlewares/authentic');

const router = express.Router();

router.use('/add-message', authController.authenticate, messageController.addMessage);

module.exports = router;