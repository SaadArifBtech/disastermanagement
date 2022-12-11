const mongoose = require('mongoose')

const resourceSchema = mongoose.Schema({
   
    type_of_resource:{
        type: String,
        required: true
    },
     
   Quantity:{
        type: Number,
        required: true,
    },
   Location_assigned :{
        type:String,
        required: true,
       
    },    
    Name:{
        type: String,
        required: true
    },
    Details: {
        type: String,
        required: true
    },
    Status: {
        type:String,
        required:true
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Resource', resourceSchema)