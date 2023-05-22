const Message = require('../models/message');
const User = require('../models/user');
const sequelize = require('../utils/database');

exports.addMessage = async (req, res) => {
    const {message} = req.body;

    const data = await Message.create({
        message:message,
        userId: req.user.id,
    });
    res.status(200).json({newMessageDetail: data});
}