const User = require("../models/user");
const Group = require("../models/group");
const UserGroup = require("../models/usergrouprelation");
const { Op } = require("sequelize");


exports.createGroup = async (req, res, next) => {
    try {
      const groupName = req.body.groupName;
      const groupAdmin = req.user.name;
      const groupMembers = req.body.members;
  
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
  
      res.status(201).json({ group: group.dataValues.name, members: members });
    } catch (error) {
      console.log(error);
    }
  };