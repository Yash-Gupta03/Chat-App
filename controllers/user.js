
const User = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');

exports.signup = async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const password = req.body.password;

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

