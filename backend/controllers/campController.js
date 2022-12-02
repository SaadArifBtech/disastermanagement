const asyncHandler = require('express-async-handler')
const EmergencyCamp = require('../models/emergencyCampModal')
const User = require('../models/userModal')
const Camp = require('../models/campModal')
const res = require('express/lib/response')


// @desc      View all Individual Camps 
// @route     POST /api/emergency-camps/camps/:id
// @access    Protected
const viewCamps = asyncHandler(async(req, res) =>{
    const camps = await Camp.find({emergency_camp_id: req.params.id})  
    if(!camps){
        res.status(400)
        throw new Error('No camps available')
    }else{
        res.status(200).json(camps)
    }  
})



// @desc      Edit all Individual Camps 
// @route     POST /api/emergency-camps/camps/edit/:id
// @access    Protected
const editCamp = asyncHandler(async(req, res) =>{   
    const{is_occupied, beds, camp_size} = req.body
    if(!is_occupied || !beds || !camp_size){
        res.status(400)
        throw new Error('Please add all fields')
    }else{
        const camp = await Camp.findById(req.params.id)  
        if(!camp){
            res.status(400)
            throw new Error('Camp not found')
        }else{
            const campInfo = await Camp.findOneAndUpdate({_id : req.params.id},
                {
                   beds: beds,
                   camp_size: camp_size, 
                   is_occupied: is_occupied,                                              
                },   
                {
                    new: true,
                }
           )
            res.status(200).json(campInfo)
        }
    
    }  
})


// @desc      Delete all Individual Camps 
// @route     POST /api/emergency-camps/camps/delete/:id
// @access    Protected
const deleteCamp = asyncHandler(async(req, res) =>{
    const camp = await Camp.findById(req.params.id)  
    if(!camp){
        res.status(400)
        throw new Error('Camp not found')
    }else{
        camp.remove()
        const main_camp_info = await EmergencyCamp.findById({_id : camp.emergency_camp_id})
        const mainCamp = await EmergencyCamp.findOneAndUpdate({_id : camp.emergency_camp_id},
            {                          
               slots: main_camp_info.slots-1,                                              
            },   
            {
                new: true,
            }
       )
        
        res.status(200).json({
            message: 'Camp deleted successfully',
            mainCamp
        })
    }  
})



module.exports = {
    viewCamps,
    editCamp,
    deleteCamp
}
