const jwt = require('jsonwebtoken');
const  {connectDatabase, closeDatabase}= require('../db/index');
const { ObjectId } = require('mongodb');

const tokenVerify = (req, res, next)=>{
     
    const authHeader = req.headers['authorization'];
    const token  = authHeader && authHeader.split(' ')[1];

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

        const userId = new ObjectId(user._id);

        const db = await connectDatabase();
        const data = await  db.collection('user').findOne({ _id: userId } )

        req.user = data;

        await closeDatabase();
        next();

    })

}

module.exports = tokenVerify;