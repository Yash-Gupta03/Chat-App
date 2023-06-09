const User = require("../models/user");
const Group = require("../models/group");
const UserGroup = require("../models/userGroup");
const Message = require('../models/message');
const { Op } = require("sequelize");


exports.createGroup = async (req, res, next) => {
    try {
      const groupName = req.body.groupName;
      const groupAdmin = req.user.name;
      const groupMembers = req.body.groupMembers;
  
      const group = await Group.create({ name: groupName, admin: groupAdmin });
  
      const invitedMembers = await User.findAll({
        where: {
          email: {
            [Op.or]: groupMembers,
          },
        },
      });
  
      (async () => {
        await Promise.all(
          invitedMembers.map(async (user) => {
            const response = await UserGroup.create({
              isadmin: false,
              userId: user.dataValues.id,
              groupId: group.dataValues.id,
            });
          })
        );
        
        await UserGroup.create({
          isadmin: true,
          userId: req.user.id,
          groupId: group.dataValues.id,
        });
      })();
  
      res.status(201).json({ group: group.dataValues.name, members: groupMembers });
    } catch (error) {
      console.log(error);
    }
  };


  exports.retrieveGroups = async (req, res, next) => {
    try {
      const groupsInfo = await Group.findAll({
        attributes: ["name"],
        include: [
          {
            model: UserGroup,
            where: { userId: req.user.id },
          },
        ],
      });
      res.status(200).json({ groupsInfo: groupsInfo });
    } catch (error) {
      console.log(error);
    }
  };


  exports.retrieveGroupsAdmin = async (req, res, next) => {
    try {
      const groupsInfo = await Group.findAll({
        attributes: ["name"],
        include: [
          {
            model: UserGroup,
            where: { userId: req.user.id, isadmin:true },
          },
        ],
      });
      res.status(200).json({ groupsInfo: groupsInfo });
    } catch (error) {
      console.log(error);
    }
  };

  exports.deleteGroup = async (req, res) =>{
    try{
      console.log("check 1");
      console.log(req.params.group);
      await Message.destroy({where:{groupname: req.params.group}})
      console.log("check 2");
    const id = await Group.findAll({where:{name:req.params.group}, attributes:['id']})
    console.log(id[0].id);
    await UserGroup.destroy({where:{groupId:id[0].id}})
    await Group.destroy({where:{name: req.params.group}});
    res.status(200).json({success: true});
    }catch(error){
      console.log(error);
    }
    

  }