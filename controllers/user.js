
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

function isStringInvalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }else{
        return false;
    }
}

function generateToken(id) {
    return jwt.sign({ userId: id}, process.env.TOKEN);
  }

exports.signup = async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const password = req.body.password;

    if(isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(number) || isStringInvalid(password)){
        res.status(400).json({message:'bad parameters'});
    }

    const check = await User.findAll({where:{email:email}});
    if(check.length > 0){
        res.status(201).json({success:false, message:"Email already exists"});
    }else{
        bcrypt.hash(password, 10, async (err, hash)=>{
            const data = await User.create({
                name:name,
                email:email,
                number:number,
                password: hash
            }).catch((err=>console.log(err)))
            res.status(200).json({success:true, message:'New user created'});
        });
    }
}


exports.login = async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    if (isStringInvalid(email) || isStringInvalid(password)) {
        res.status(400).json({ message: "bad parameters" });
      }

    const data = await User.findAll({
        where: {email:email}
    });
    if (data.length>0){
        bcrypt.compare(password, data[0].password, (error, result)=>{
            if(error){
                res.status(500).json({message:'something wrong happened'});
            }else if(result == true){
                res.status(200).json({
                    success: true,
                    message:'logged in successfully',
                    token: generateToken(data[0].id)
                });
            }else{
                res.status(201).json({success: false, message:'wrong password'});
            }
        });
    }else{
        res.status(201).json({success:false, message:'user does not exist, try again'});
    }
};
