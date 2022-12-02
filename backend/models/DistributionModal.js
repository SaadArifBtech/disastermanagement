const mongoose = require('mongoose')

const distributionSchema = mongoose.Schema({
   
    name:{
        type: String,
        required: true
    },
     
   cnic:{
        type: String,
        required: true,
    },
  address :{
        type:String,
        required: true,
       
    },    

   contactno:{
        type: String,
        required: true
    },   
     
    
   transfertype:{
        type: String,
        required: true
    },    
    
    distributedby:{
         type: String,
         required: true
     },       
    city:{
         type: String,
         required: true
     },    
    province:{
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
    bankname:{
        type: String,
        required: true
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Distribute', distributionSchema)