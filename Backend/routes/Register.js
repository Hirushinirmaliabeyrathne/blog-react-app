const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async(req, res) =>{
    try{
        const{username, email, phonenumber,password,confirmpassword} = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const user = new User({username,email,phonenumber,password: hashedPassword, confirmpassword});
        console.log(user);
        await user.save();

        res.status(200).json({
            status:'success',
            data:{
                user
            }
        });
    } catch(err) {
        let errorMessage;

        if (err.code === 11000){
            errorMessage = 'Email already exists';
        } else if (err.username === 'validationError'){
            errorMessage = Object.values(err.errors).map(val.message).json(',');
        }else{
            errorMessage = err.message;
        }

        res.status(500).json({
            status:'failed',
            message:errorMessage
        });
    }
});

module.exports = router;
