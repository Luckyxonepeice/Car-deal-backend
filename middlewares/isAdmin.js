const isAdmin = (req, res, next)=>{

    const user = req.user;

    if(user.admin==false){
        return res.status(401).json({Error:"UnAuthorized Access"});
    }

    next();
}

module.exports = isAdmin;
