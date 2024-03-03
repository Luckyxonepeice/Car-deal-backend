const validator= (req, res, next)=>{

    const {
        email,
        password,
        location,
    } = req.body;

    if(password.length===0 || location.length===0 || email.length===0){
        
        return res.json({
            Error:"Fill Out the Parameters"
        })
    }

    if(!checkPasswordStrength(password)){
        return res.json({
            Error:"Password must be greater then 8 letter, contain 1 each upper ,lowercase , number , special characters"
        })
    }
    if(isEmailValid(email)){
        next();
    }else{
        return res.json({
            Error:"Invalid Credentials"
        })
    }
}
const validatorLogin= (req, res, next)=>{

    const {
        email,
        password,
    } = req.body;

    if(password.length===0  || email.length===0){
        
        return res.json({
            Error:"Fill Out the Parameters"
        })
    }

    if(!checkPasswordStrength(password)){
        return res.json({
            Error:"Password must be greater then 8 letter, contain 1 each upper ,lowercase , number , special characters"
        })
    }
    if(isEmailValid(email)){
        next();
    }else{
        return res.json({
            Error:"Invalid Credentials"
        })
    }
}

function isEmailValid(email) {

    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}
function checkPasswordStrength(password) {
    const minLength = 8;
    const minUpperCase = 1;
    const minLowerCase = 1;
    const minNumbers = 1;
    const minSpecialChars = 1;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
    if (password.length < minLength) {
      return false;
    }
  
    if ((password.match(/[A-Z]/g) || []).length < minUpperCase) {
      return false;
    }
  
    if ((password.match(/[a-z]/g) || []).length < minLowerCase) {
      return false;
    }
  
    if ((password.match(/\d/g) || []).length < minNumbers) {
      return false;
    }
  
    if ((password.match(specialChars) || []).length < minSpecialChars) {
      return false;
    }
  
    return true;
}

module.exports = {validator, validatorLogin};