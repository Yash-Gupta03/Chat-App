const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routers/user');
const sequelize = require('./utils/database');


app.use(cors());

app.use(bodyParser.json({extended: false}));

app.use('/user',userRoutes);

app.use(express.static("public"));

app.use((req, res)=>{
  res.sendFile(path.join(__dirname, `public/${req.url}`));
})

sequelize.sync()
.then()
.catch((err)=>console.log(err));

app.listen(3000);