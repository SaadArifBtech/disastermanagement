const mongoose = require('mongoose')
const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://saad:saadarif1122@cluster0.md28pqx.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>console.log(`MongoDB Connected`.cyan.underline))
        .catch((err)=> console.log(err));        
    } catch (error) {
        console.log(error);
        process.exit(1)   
    }
}

module.exports = connectDB

