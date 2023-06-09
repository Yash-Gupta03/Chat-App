const Message = require('../models/message');
const User = require('../models/user');
const sequelize = require('../utils/database');


const io = require("socket.io")(4000, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

exports.addMessage = async (req, res) => {
    const message = req.body.message;
    const groupName = req.body.groupName;
    const{name} = req.user;

    const data = await Message.create({
        message:message,
        userId: req.user.id,
        groupname:groupName,
        name:name,
    });
    const userName = await User.findOne({where:{id: req.user.id}, attributes:['name']})


    res.status(200).json({newMessage: data, name: userName});
}

exports.retrieveMessages = async (req, res) => {
    const gname = req.params.gname;
    const data = await Message.findAll({where:{groupname:gname}, attributes:['message', 'name']});
    // console.log(data);
    res.status(200).json({allMessages: data})
}