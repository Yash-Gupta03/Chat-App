const Message = require('../models/message');
const User = require('../models/user');
const sequelize = require('../utils/database');

exports.addMessage = async (req, res) => {
    const {message} = req.body;

    const data = await Message.create({
        message:message,
        userId: req.user.id,
    });
    const userName = User.findOne({where:{id: req.user.id}, attributes:['name']})

    res.status(200).json({newMessageDetail: data, name: userName});
}

exports.getMessage = async (req, res) => {
    const data = await Message.findAll();
    res.status(200).json({allMessageDetails: data})
}