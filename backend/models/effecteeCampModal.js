const mongoose = require('mongoose')

const effecteeCampSchema = mongoose.Schema({
    camp_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Camp'
    },
    emergency_camp_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'EmergencyCamp'
    },
    effectee_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,        
        ref: 'EndUser',
    },
    arrival_on:{
        type: String,
        required: true,        
    },
    approved_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})