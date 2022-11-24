const jwt = require("jsonwebtoken")

module.exports = (data) =>{
    return jwt.sign(data, '$hvbhasdfcd', {expiresIn: '7d'});

};

