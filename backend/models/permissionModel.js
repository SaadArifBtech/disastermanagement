const mongoose = require('mongoose')

const permissionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    permissions:{
        type: Object,
        required: true,
        default: {
            createCamp: false,            
        }
    }, 

},{
    timestamps: true
})

module.exports = mongoose.model('Permission', permissionSchema)