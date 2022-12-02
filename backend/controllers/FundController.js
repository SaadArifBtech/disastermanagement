const asyncHandler = require('express-async-handler')

const Fund = require('../models/FundModal')

const res = require('express/lib/response')
const mongoose = require('mongoose');
const { random } = require('colors');
const Distribute= require('../models/DistributionModal');
const ObjectId = mongoose.Types.ObjectId;



const viewFunds = asyncHandler(async(req, res) =>{
    // const camps = await EmergencyCamp.find()
    const resources = await Fund.find()
   
    res.status(200).json(resources)
})
const viewDistribute = asyncHandler(async(req, res) =>{
    // const camps = await EmergencyCamp.find()
    const resources = await Distribute.find()
   
    res.status(200).json(resources)
})


// @desc      Edit Emergency Cam 
// @route     POST /api/emergency-camps/edit/:id
// @access    Protected
const editFunds = asyncHandler(async(req, res) =>{
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {        
        const camp = await EmergencyCamp.findById(req.params.id)
        const {name, city, address, local_address, area } = req.body            
        if(!camp){
            res.status(400)
            throw new Error('Camp was not found')
        }else{
            const campInfo = await EmergencyCamp.findOneAndUpdate({_id : req.params.id},
                {
                    name: name,
                   city: city,
                   address: address, 
                   local_address: local_address,                
                   area: area
                   
                },   
                {
                    new: true,
               }
           )
    
           res.status(200).json({campInfo, message: 'Camp information is updated'})
            
        }
      }else{
          res.status(400)
          throw new Error('Object is not valid')
      }

})




const addFunds = asyncHandler(async(req, res) =>{
    const { 
        name,
        providertype,
       taxid ,
       transfertype,
       accountno,
       details,
    amountreceived,
    accountreceivable,
    bankname} = req.body
    
    if(!name || !providertype|| !taxid || !transfertype || !details || !accountno || !amountreceived || !accountreceivable || !bankname){
        res.status(400)
        throw new Error('Bad Request, Please add all fields')
    }
    
   

   
      
        const fund_new = await Fund.create({
           
            
            
            name: req.body.name,
            providercategory: req.body.providertype,
            taxid: req.body.taxid,
            transfertype: req.body.transfertype,
            accountno: req.body.accountno,
            details: req.body.details,
            amountrecieved:req.body.amountreceived,
            amountrecieved:req.body.amountreceived,
            accountreceieved:req.body.accountreceivable,
            bankname:req.body.bankname,
           
        })
    

        if(fund_new){
            res.status(201).json({
               
                name: fund_new.name,
                providercategory: fund_new.providertype,
                taxid: fund_new.taxid,
                transfertype: fund_new.transfertype,
                accountno: fund_new.accountno,
                details: fund_new.details,
                amountrecieved:fund_new.amountreceived,
                amountrecieved:fund_new.amountreceived,
                accountreceieved:fund_new.accountreceivable,
                bankname:fund_new.bankname,
                
            })
        }
        else{
            res.status(400)
            throw new Error('Something went wrong - cannot create camp')
        }    
    
    }    
)


const addDistribute = asyncHandler(async(req, res) =>{
    const { 
        name,
        providertype,
       cnic ,
       city,
       address,
       contactno,
       province,
       transfertype,
       accountno,
       details,
    amountreceived,
   
    bankname} = req.body
    
    if(!name || !providertype|| !cnic || !city || !address || !accountno || !amountreceived  || !bankname){
        res.status(400)
        throw new Error('Bad Request, Please add all fields')
    }
   let fund_new= Fund.aggregate( [
        // Stage 1: Filter pizza order documents by pizza size
        {
           $match: { }
        },
        // Stage 2: Group remaining documents by pizza name and calculate total quantity
        {
           $group: { _id: "$name", total: { $sum: "$amountrecieved" } }
        }
     ] )
     console.log(fund_new);
     
    if(fund_new.total < amountreceived){
        res.status(400)
        throw new Error('Fund Extends limits')
    }
  
      
        const dist_new = await Distribute.create({
           
            
            
            name: req.body.name,
            distributedby: req.body.providertype,
            cnic: req.body.cnic,
            transfertype: req.body.transfertype,
            address: req.body.address,
             contactno: req.body.contactno,
             city: req.body.city,
            province: req.body.province,
            accountno: req.body.accountno,
            details: req.body.details,
            amountrecieved:req.body.amountreceived,
            bankname:req.body.bankname,
           
        })
    

        if(dist_new){
            res.status(201).json({
               
                name: dist_new.name,
            distributedby: dist_new.providertype,
            cnic: dist_new.cnic,
            transfertype: dist_new.transfertype,
            address: dist_new.address,
             contactno: dist_new.contactno,
             city: dist_new.city,
            province: dist_new.province,
            accountno: dist_new.accountno,
            details: dist_new.details,
            amountrecieved:dist_new.amountreceived,
            bankname:dist_new.bankname,
                
            })
        }
        else{
            res.status(400)
            throw new Error('Something went wrong - cannot create camp')
        }    
    
    }    
)





module.exports = {
    viewFunds,
    addFunds,
    editFunds,
    addDistribute,
    viewDistribute,
}