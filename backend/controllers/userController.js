const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModal')
const Permission = require('../models/permissionModel')
const res = require('express/lib/response')




// @desc      Create New User
// @route     POST /api/users
// @access    Public
const registerUser = asyncHandler( async (req, res)=>{


    const {name, email, username, password, role, cnic , address, mobile, province} = req.body
    if(!name || !email || !password || !username || !role || !cnic || !mobile || !address || !province){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // const userExists = await User.findOne({email: email, username: username})
    const userExists = await User.findOne({email})    
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const checkUsername = await User.findOne({username})
    if(checkUsername){             
        res.status(400)
        throw new Error('User with this username already exists')           
    }
   

    const salt = await bcrypt.genSalt(10)
    const hashedPassword  = await bcrypt.hash(password, salt)

    // cnic,
    // name,
    // address,
    // mobile,
    // password,
    // confirmPassword,      
    // email,  

   const user = await User.create({
        name,
        email,
        username,
        role,
        province,
        password: hashedPassword,
        cnic,
        address,
        contact: mobile
    })

     const permissions = await Permission.create({
        user: user._id,    
     })

    if(user && permissions){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,            
            province: user.province            
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }    
})


// @desc      Authenticate a user
// @route     POST /api/users/login
// @access    Public
const loginUser =  asyncHandler( async (req, res)=>{
    const { username, password} = req.body
    const user  = await User.findOne({username})
    const permissions = await Permission.findOne({user: user._id})    
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = generateToken(user._id)
        res.json(
            {
                accessToken,
                user: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    cnic: user.cnic,
                    address: user.address,                    
                    role: user.role,
                    contact: user.contact,                    
                    province: user.province,
                    permissions: permissions                    
                }
            }
        )

    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }

  
})


const deleteUser = asyncHandler (async (req, res)=>{
    const user = await User.findById(req.params.id)

    const loggedUser = await User.findById(req.user.id)
    if(loggedUser.role != 'Superadmin'){
        res.status(400)
        throw new Error('You cannot perform this action')
    }

    await user.remove()
    res.status(200).json({message: `${req.params.id} is deleted successfully`})

})

// @desc      Get user data
// @route     GET /api/users/me
// @access    Private
const getMe = asyncHandler( async (req, res)=>{
    const {_id, name , email, username, role, photo, contact, cnic, address} = await User.findById(req.user.id)
    const permissions = await Permission.findOne({user: _id})
   
    res.status(200).json({
        user: {
            id: _id,
            name: name,
            email: email,
            username: username,
            role: role,
            photo,
            contact,
            province,
            address,
            cnic,
            permissions
        }
    })
})

const getAllUsers = asyncHandler (async(req, res)=>{
    const users = await User.find()    
    const loggedUser = await User.findById(req.user.id)
    if(loggedUser.role !== 'Superadmin'){
        res.status(400)
        throw new Error('You dont have permissions to view this page')
    }
    
    res.status(200).json(users)

})

const updatePass = asyncHandler (async(req, res) => {
    const user = await User.findById(req.user.id)
    const {oldPassword, password} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword  = await bcrypt.hash(password, salt)

    if(user && (await bcrypt.compare(oldPassword, user.password))){
        User.updateOne(
            {_id: user._id},
            {
                $set: {
                    password: hashedPassword
                }
            }
        )

        res.status(200).json({message: 'Your password has been changed!'})
    }else{
        res.status(400)
        throw new Error('Old password was incorrect')
    }

})


// Update profile method

const updateProfile = asyncHandler (async (req, res) => {
    
    const user = await User.findById(req.user.id)
    const {username, name, address, cnic, email, contact} = req.body
    const data = {
        username, name, address, cnic, email, contact
    }

    if(!user){
        res.status(400)
        throw new Error('User Not found')
    }

    const userInfo = await User.findOneAndUpdate({_id : req.user.id},
         {
            name: name,
            address: address, 
            cnic: cnic, 
            // email: email, 
            contact: contact
            
         },   
         {
             new: true,
        }
    )
     
    res.status(200).json({
        userInfo: userInfo,
        message: 'Information Updated'
    })
    



})

// Generate JWT
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
module.exports = {
    registerUser,
    loginUser,
    getMe,
    deleteUser,
    getAllUsers,
    updatePass,
    updateProfile
}