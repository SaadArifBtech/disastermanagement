const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add a name"]
    },
    email:{
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Please add a username "],
        unique: true
    },
    address:{
        type: String,
        required: false,
        default: ''
    },
    role:{
        type: String,
        required: true,        
    },
    province:{
        type: String,
        required: true,        
    },
    contact:{
        type: String,
        required: false,
        default: ''
    },
    cnic:{
        type: String,
        required: false,
        default: null,  
        unique: false      
    },
    photo:{
        type: Buffer,
        required: false,
        default: null
    },
    password:{
        type: String,
        required: [true, "Please add a password"]
    },
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)