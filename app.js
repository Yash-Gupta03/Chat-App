const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routers/user');
const messageRoutes = require('./routers/message');
const groupRoutes = require('./routers/group');
const sequelize = require('./utils/database');

const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/group');
const UserGroup = require('./models/userGroup');

dotenv.config();

app.use(cors(
  {
  // origin:'http://127.0.0.1:5500',
  // methods: [],
  // credentials: true       for cookies
}
));

app.use(bodyParser.json({extended: false}));

app.use('/user',userRoutes);
app.use('/message', messageRoutes);
app.use('/group', groupRoutes);

app.use(express.static("public"));

app.use((req, res)=>{
  res.sendFile(path.join(__dirname, `public/${req.url}`));
})

User.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Group);
User.hasMany(UserGroup);
Group.hasMany(Message);
Group.hasMany(UserGroup);
UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);

sequelize.sync()
.then()
.catch((err)=>console.log(err));

app.listen(3000);