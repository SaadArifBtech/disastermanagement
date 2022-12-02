const mongoose = require('mongoose')

const campRegisterationsSchema = mongoose.Schema({
    emergency_camp_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'EmergencyCamp'
    },
    effectee_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'EndUser'
    },
    is_approved:{
        type: Boolean,
        required: false,
        default: false
    }     
},{
    timestamps: true
})

module.exports = mongoose.model('CampRegisteration', campRegisterationsSchema)