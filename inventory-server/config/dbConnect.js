

const mongoose = require("mongoose");

const connect = ()=>{
    mongoose.connect(process.env.MONGO_URI, {}, (err) =>{
        if (err) throw err;
        console.log("database is connected");
    });
};

module.exports = connect;