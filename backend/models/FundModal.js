const mongoose = require('mongoose')

const fundSchema = mongoose.Schema({
   
    name:{
        type: String,
        required: true
    },
     
   providercategory:{
        type: String,
        required: true,
    },
  taxid :{
        type:String,
        required: true,
       
    },    
   transfertype:{
        type: String,
        required: true
    },
   accountno: {
        type: String,
        required: true
    },
    details: {
        type:String,
        required:true
    },
   amountrecieved: {
        type:Number,
        required:true
    },
    accountreceieved: {
        type: String,
        required: true
    },
    bankname:{
        type: String,
        required: true
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Fund', fundSchema)