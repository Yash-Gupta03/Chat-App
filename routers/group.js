const express = require('express');
const groupController = require('../controllers/group');
const authController = require("../middlewares/authentic");
const router = express.Router();

router.use('/create', authController.authenticate, groupController.createGroup);

router.use('/retrieve', authController.authenticate, groupController.retrieveGroups);

router.use('/fetch-admin', authController.authenticate, groupController.retrieveGroupsAdmin);

router.use('/delete-group/:group', authController.authenticate, groupController.deleteGroup);

module.exports = router;