const express = require('express');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  {validator, validatorLogin}  = require('../middlewares/helper');
const  {connectDatabase, closeDatabase}= require('../db/index');

const router=express.Router();

router.post('/sign-in',validator,async(req, res)=>{

    try {
        const data = req.body;

        const hash_password = await bcrpyt.hash(data.password,10);
        
        data.password = hash_password;

        const db = await connectDatabase();

        const exist = await db.collection('user').findOne({email:data.email});

        if(exist){
            return res.json({
                Error:"Already User with this Email-id"
            })
        }

        const result = await db.collection('user').insertOne(data);

        await closeDatabase();

        return res.json({result:result});

    }catch(err){
        console.log(err);
        return res.status(500).json({Error:"Error in Sign-in"});
    }
    
})

router.post('/login', async(req, res)=>{

    try {
      const data = req.body;

      const db = await connectDatabase();

      const user = await db.collection("user").findOne({ email: data.email });



      if (!user) {
        return res.json({
          Error: "Wrong Credentials!",
        });
      }

      const check_password = await bcrpyt.compare(data.password, user.password);

      if (!check_password) {
        return res.json({
          Error: "Wrong Credentials!",
        });
      }
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      await closeDatabase();
      return res.json({ admin:user.admin,token: token });
    } catch (err) {
        console.log(err)
      return res.status(500).json({ Error: "Error in Login!" });
    }
})

module.exports = router;