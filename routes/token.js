const express = require('express');
const  {connectDatabase, closeDatabase}= require('../db/index');
const jwt = require('jsonwebtoken');
const router=express.Router();


 

router.post('/', async (req, res)=>{
     
    const {val} = req.body;

    const token = val;

    if(!token){

        return res.json({
            Error:"Invalid User!"
        })
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, async (err,user)=>{

        if(err){
            return res.json({
                Error:"Invalid User!"
            })
        }

        return res.json({result:user});

        
    })



})



module.exports=router