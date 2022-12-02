const mongoose = require('mongoose')

const campSchema = mongoose.Schema({
    emergency_camp_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'EmergencyCamp'
    },
    camp_no:{
        type: String,
        required: true
    },
    beds:{
        type: Number,
        required: true,
        default: 0        
    },
    camp_size:{
        type: Number,
        required: true,
    },
    is_occupied :{
        type: Boolean,
        required: true,
        default: false,
    },    

},{
    timestamps: true
})

module.exports = mongoose.model('Camp', campSchema)