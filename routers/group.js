const express = require('express');
const groupController = require('../controllers/group');
const authController = require("../middlewares/authentic");
const router = express.Router();

router.use('/create', authController.authenticate, groupController.createGroup);