const express = require('express');
const  {connectDatabase, closeDatabase}= require('../db/index');
const router=express.Router();
const tokenVerify = require('../middlewares/tokenVerify');
const isAdmin = require('../middlewares/isAdmin');
const { ObjectId } = require('mongodb');


router.get('/get-dealer', tokenVerify , isAdmin , async(req, res)=>{
    
    try{

        const email = req.user.email;

        const db = await connectDatabase();

        const dealer = await db.collection('user').findOne({email:email});

        const cars = await db.collection('cars').find({email:email}).toArray();

        dealer.cars = cars;

        const result = await db.collection('soldcar').find({email:req.user.email}).toArray();

        const carIds = [];

        result.forEach( (val)=>{

            val.cars_id.forEach( (value)=>{
                carIds.push(new ObjectId(value));
            })
        })

        const car_info = await db.collection('cars').find({
            "_id":{$in:carIds}
        }).toArray();

        dealer.soldcars= car_info;

        await closeDatabase();

        console.log(dealer);

        return res.json("h1")


    }catch (err){
        console.log(err);

        return res.status(500).json({
            Error:"Error in Getting Dealer"
        })
    }
})
module.exports = router;