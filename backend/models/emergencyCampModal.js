const mongoose = require('mongoose')

const emergencyCampSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: [true, 'Please add a city']
    },
    province: {
        type: String,
        required: [true, 'Please add a province']
    },
    address: {
        type: String,
        required: [true, 'Please add a address']
    },
    local_address: {
        type: String,
        required: [true, 'Please add a local_address']
    },
    area:{
        type: Number,
        required: true,
    },
    allowed_registerations:{
        type: Boolean,
        required: true,
        default: true,
    },    
    creater:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    slots: {
        type: Number,
        required: true,
        default: 0
    },
    registerations: {
        type: Number,
        required: false,
        default: 0
    },
    coordinates:{
        type: Array,
        required: true,
        default: []
    }  
},{
    timestamps: true
})

module.exports = mongoose.model('EmergencyCamp', emergencyCampSchema)

