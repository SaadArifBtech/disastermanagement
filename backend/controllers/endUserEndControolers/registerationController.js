const asyncHandler = require('express-async-handler')
const Registeration = require('../../models/campRegisterationsModal')
const EmergencyCamp = require('../../models/emergencyCampModal')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const register = asyncHandler(async(req, res)=>{
    const {camp_id, user_id} = req.body
    if(!camp_id || !user_id){
        res.status(400)
        throw new Error('Please add all fields')
    }else{        
        // storing information in registeration modal
        const registeration = await Registeration.create({
            effectee_id: user_id,
            emergency_camp_id: camp_id
        })

        const camp = await EmergencyCamp.findById(camp_id)

        const campInfo = await EmergencyCamp.findOneAndUpdate({_id : camp_id},
            {
               registerations: camp.registerations + 1,
               slots: camp.slots - 1                              
            },   
            {
                new: true,
            }
       )
        

        if(registeration){
            res.status(200).json({                
                registeration: registeration
            })
        }else{
            res.status(400)
            throw new Error('Registeration was failed')
        }
    }

})

const getMyRegs = asyncHandler(async(req, res)=>{
    const user_id = req.params.id
    const regs = await Registeration.aggregate([
        {
        $match: { effectee_id: ObjectId(user_id) }
        },
        {
        $lookup:{
            from: 'emergencycamps',
            localField: 'emergency_camp_id',
            foreignField: '_id',
            as: 'campDetails',            
        }       
        }
    ]) 
    if(regs){
        res.status(200).json(regs)
    }else{
        res.status(400)
        throw new Error('Something went wrong')
    }
})
module.exports = {
    register,
    getMyRegs
}