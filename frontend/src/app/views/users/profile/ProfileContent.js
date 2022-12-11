import React , { useEffect } from 'react'
import {SimpleCard } from 'app/components'
import { H3, H4 , Paragraph, H5 , Span} from 'app/components/Typography'
import MatxDevider from 'app/components/MatxDivider/MatxDivider'
import {  Grid, Box, Icon, Container , Button} from '@mui/material'
import {styled} from '@mui/system'
import useAuth from 'app/hooks/useAuth'
import Modal from 'app/components/modals/ModalCustom'
import {Snackbar, Alert} from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import axios from 'axios.js'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

function ProfileContent() {

    const {user}= useAuth()

    const [openModal, setOpenModal] = React.useState(false)
    const [openEditModal, setOpenEditModal] = React.useState(false)
    const [message, setMessage]= React.useState('')
    const [isMessage, setIsMessage] = React.useState(false)
    const [vertical, setVertical] = React.useState('top')
    const [horizontal, setHorizontal] = React.useState('right')
    const[messageColor, setMessageColor]= React.useState('success') 
    const[userInfo, setUserInfo] = React.useState({
        username: user.username,        
        email : user.email,
        contact: user.contact,
        cnic: user.cnic,
        address: user.address,
        name: user.name,
        role: user.role

    })   
    const [state, setState] = React.useState({})
    console.log(user)
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== state.password) {
                return false
            }
            return true
        })
        setState({
            ...state,
            username: userInfo.username,        
            email : userInfo.email,
            contact: userInfo.contact,
            cnic: userInfo.cnic,
            address: userInfo.address,
            name: userInfo.name
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })        
    }

    const handleAlertClose = () => {
        setIsMessage(false)
    }

   const {
        password,
        password2,
        oldPassword,
        username,
        email ,
        contact,
        cnic,
        address,
        name

    } = state
    const handleOpen =()=>{
        setOpenModal(true)
        console.log(openModal)                
    }
    function handleModalClose(val){
        setOpenModal(val)
        setOpenEditModal(val)
    }

    function handleEditModalOpen (){
        setOpenEditModal(true)
    }
    const StyledButton = styled(Button)(({ theme }) => ({
        margin: theme.spacing(1),
    }))

    const handleSubmit =async ()=>{
        try{
            const data = {...state}            
            const response = await axios.put('/api/users/update-password', data)
            setMessage(response.data.message)            
            setMessageColor('success')
            setIsMessage(true)            
            setOpenModal(false)
        }
        catch(e){
            console.log(e)
            setMessage(e.message)            
            setMessageColor('error')
            setIsMessage(true)
        }
    }

    const handleEditProfileSubmit =async ()=>{
        try{

            const {username, email, address, cnic, name, contact } = state

            const data = {
                 address, cnic, name, contact
            }
            console.log("submitted")
            const response = await axios.put(`/api/users/update-profile`, data)
            setMessage(response.data.message)  
            setUserInfo({
                ...userInfo,             
                contact:  response.data.userInfo.contact,
                cnic:     response.data.userInfo.cnic,
                address:  response.data.userInfo.address,
                name:     response.data.userInfo.name
            }) 
            console.log("This is user info" +  response.data.userInfo)         
            setMessageColor('success')
            setIsMessage(true)            
            setOpenEditModal(false)
        }
        catch(e){
            console.log(e)
            setMessage(e.message)            
            setMessageColor('error')
            setIsMessage(true)
        }
    }

    
  return (
    <div>
           <Grid container>
                <Grid item xs={12} md={5} sx={{textAlign: 'center'}}> 
                    <SimpleCard title="" sx={{padding: 0}}>
                            <Box 
                                component="img"
                                sx={{
                                    height: 233,
                                    width: 180,
                                    maxHeight: { xs: 180, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                    borderRadius: "50%",
                                    
                                }}
                                alt="Profile Image"
                                src= {user.photo != null ? user.photo : "/avatar.png"} 
                            />
                            <H3>{userInfo.name}</H3>
                            <Paragraph>{userInfo.role}</Paragraph>
                            <MatxDevider />
                            <Grid container sx={{textAlign: 'left',  padding: '5px', marginTop: 1}}>
                                <Grid item xs={3}>
                                    <H5>Email</H5>                                                                        
                                </Grid>
                                <Grid item xs={9}>
                                    {userInfo.email}
                                </Grid>                                                                                                                                
                            </Grid>
                            <MatxDevider />
                            <Grid container sx={{textAlign: 'left', padding: '5px'}}>
                                <Grid item xs={3}>
                                    <H5>Contact</H5>                                                                        
                                </Grid>
                                <Grid item xs={9}>
                                    {userInfo.contact ? userInfo.contact : 'N/A'}
                                </Grid>                                                                                                                                
                            </Grid>
                            <MatxDevider />
                            <Grid container sx={{textAlign: 'left',  padding: '5px'}}>
                                <Grid item xs={3}>
                                    <H5>CNIC</H5>                                                                        
                                </Grid>
                                <Grid item xs={9}>
                                    {userInfo.cnic ? userInfo.cnic : 'N/A'}
                                </Grid>                                                                                                                                
                            </Grid>
                            <MatxDevider />
                            <Grid container sx={{textAlign: 'left',  padding: '5px'}}>
                                <Grid item xs={3}>
                                    <H5>Role</H5>                                                                        
                                </Grid>
                                <Grid item xs={9}>
                                    {userInfo.role ? userInfo.role : 'Not Provided'}
                                </Grid>                                                                                                                                
                            </Grid>
                            <MatxDevider />

                    </SimpleCard>
                </Grid>
                               
                <Grid item xs={12} md={6} sx={{marginLeft: 1}}>
                    <SimpleCard title="Other Details">
                        <MatxDevider />
                        <Grid container>
                                <Grid item xs={5} sx={{padding: '5px'}}>
                                <H5>Address</H5>
                       
                                </Grid>
                                <Grid item xs={7} sx={{padding: '5px'}}>
                                    <Container sx={{display: "flex"}}>
                                        <Icon >home_outline</Icon><Paragraph sx={{marginTop: "2px"}}> {userInfo.address? userInfo.address: 'No address provided'} </Paragraph>
                                    </Container>
                                </Grid>
                        </Grid>
                        <MatxDevider /> 
                         <H4 sx={{marginTop: 2}}>Account & Password</H4>       
                         <Grid container sx={{marginTop: 1}}>
                                <Grid item xs={5} sx={{padding: '5px'}}>
                                <H5>Username</H5>
                       
                                </Grid>
                                <Grid item xs={7} sx={{padding: '5px'}}>
                                    <Container sx={{display: "flex"}}>
                                        <Icon>person_outline</Icon><Paragraph sx={{marginTop: "2px"}}> {userInfo.username? userInfo.username: 'No username'} </Paragraph>
                                    </Container>
                                </Grid>
                        </Grid>
                        <MatxDevider /> 
                        <Container>
                            <StyledButton
                                color="primary"
                                className="button"
                                aria-label="Add user"
                                variant="contained" 
                                onClick={handleEditModalOpen}
                            >                        
                            <Icon>create</Icon> Edit profile
                            </StyledButton>
                            <StyledButton
                                color="secondary"
                                className="button"
                                aria-label="Add user"
                                variant="contained" 
                                onClick={handleOpen}
                            >                        
                            <Icon>lock</Icon> Change Password
                            </StyledButton>
                        </Container>
                    </SimpleCard>          
                </Grid>                
            </Grid>
            <Modal text="Change Password" handleModalClose = {handleModalClose} open={openModal} title="Change Password">
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Grid container spacing={12}>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="oldPassword"
                                id="standard-basic"
                                onChange={handleChange}
                                value={oldPassword || ''}
                                validators={[
                                    'required',                                                                      
                                ]}
                                label="Old Password"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="password"
                                name="password"
                                id="standard-basic"
                                onChange={handleChange}
                                value={password || ''}
                                validators={[
                                    'required',
                                    'minStringLength: 8',                                    
                                ]}
                                label="New Password"
                                errorMessages={['this field is required']}
                            />
                             <TextField
                                label="Confirm New Password"
                                onChange={handleChange}
                                name="password2"
                                type="password"
                                value={password2 || ''}
                                validators={['required', 'isPasswordMatch']}
                                errorMessages={[
                                    'this field is required',
                                    "password didn't match",
                                ]}
                            />   
                            <Button type="submit" color="primary" variant="contained" >
                                <Icon>done</Icon>
                                     <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                                        Save Changes
                                     </Span>
                            </Button>                                                                        
                        </Grid>
                    </Grid>
                
                 </ValidatorForm>
             </Modal>


             {/* Edit Modal */}

             <Modal text="Edit Profile" handleModalClose = {handleModalClose} open={openEditModal} title="Edit Profile Information">
                <ValidatorForm onSubmit={handleEditProfileSubmit} onError={() => null}>
                    <Grid container spacing={12}>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="standard-basic"
                                onChange={handleChange}
                                value={name || ''}
                                validators={[
                                    'required',                                                                      
                                ]}
                                label="Name"
                                errorMessages={['this field is required']}
                            />
                          
                            <TextField
                                label="Address"
                                onChange={handleChange}
                                name="address"
                                type="text"
                                value={address || ''}
                                validators={['required']}
                                errorMessages={[
                                    'this field is required',                                    
                                ]}
                            /> 
                            <TextField
                                label="Mobile"
                                onChange={handleChange}
                                name="contact"
                                type="text"
                                value={contact || ''}
                                validators={['required']}
                                errorMessages={[
                                    'this field is required',                                    
                                ]}
                            />   
                            <TextField
                                label="CNIC"
                                onChange={handleChange}
                                name="cnic"
                                type="text"
                                value={cnic || ''}
                                validators={['required']}
                                errorMessages={[
                                    'this field is required',                                    
                                ]}
                            />   
                            <Button type="submit" color="primary" variant="contained" >
                                <Icon>done</Icon>
                                     <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                                        Save Changes
                                     </Span>
                            </Button>                                                                        
                        </Grid>
                    </Grid>
                
                 </ValidatorForm>
             </Modal>

             {/* SnackBar */}
             <Snackbar 
                open={isMessage} 
                autoHideDuration={6000}  
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`} 
                onClose={handleAlertClose}
                >
                    <Alert                                           
                        severity={messageColor}
                        sx={{ width: '100%' }}
                        variant="filled"
                    >
                        {message}
                    </Alert>
                </Snackbar>
    </div>    
  )
}

export default ProfileContent