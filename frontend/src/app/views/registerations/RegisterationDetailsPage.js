import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import {  Button, Grid, Snackbar, Alert, Stack, Chip} from '@mui/material'
import Modal from 'app/components/modals/ModalCustom'
import { Span } from 'app/components/Typography'
import Loader from 'app/components/Loader/Loader'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'


import axios from 'axios.js'

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}))

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const elStyle={
    display : "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    marginBottom: "16px"
}

const RegisterationDetails = () => {
    const { id } = useParams()
    const [details, setDetails] = React.useState(null)
    const[isMessage, setIsMessage] = React.useState(false)
    const [vertical, setVertical] = React.useState('top')
    const[loading, setLoading] = React.useState(false)
    const[loadingBtn, setLoadingBtn] = React.useState(false)
    const [message, setMessage]=React.useState('')
    const[messageColor, setMessageColor]=React.useState('success')
    const [horizontal, setHorizontal] = React.useState('right')
    const [updated, setUpdated] = React.useState(false)
    const [openRegModal, setOpenRegModal]= React.useState(false)    

    React.useEffect(async()=>{
        setLoading(true)
        const response = await axios.get(`/api/registerations/view-registerations/${id}`)        
        setDetails(response.data[0]) 
        console.log(response.data[0])
        setLoading(false)
    },[updated])

    const handleRegModalClose = ()=>{
        setOpenRegModal(false)
    }

    const handleRegModalOpen = ()=>{
        setOpenRegModal(true)
    }

    const handleRegUpdate = async()=>{
        try{
            setLoadingBtn(true)
            const response = await axios.post(`/api/registerations/approve/${id}`)
            console.log(response.data)
            setMessage(response.data.message)
            setIsMessage(true)
            setLoadingBtn(false)
            if(updated == false){
                setUpdated(true)
            }else{
                setUpdated(false)
            }
            setOpenRegModal(false)
         
        }
        catch(e){
            console.log(e.message)
            setMessage(e.message)
            setIsMessage(true)
            setLoadingBtn(false)
        }
    }

    const handleClose = () => {
        setIsMessage(false)
    }

    let regDetails = <Loader />
    let approved = false
    let btnTxt = "Approve"
    if(details){
        console.log(details)
       regDetails =  <SimpleCard title='Registeration Details'>
                    <Grid container spacing={2}>
                        <Grid item md={6} >
                            <div style={elStyle}>
                                <span >Effectee Name</span>  
                                <span>{details.effecteeDetails[0].name}</span>
                            </div>
                            <hr/>
                            <div style={elStyle}>
                                <span >Effectee Email</span>  
                                <span>{details.effecteeDetails[0].email}</span>
                            </div>
                            <hr/>                        
                            <div style={elStyle}>
                                <span >Camp Name</span>  
                                <span>{details.campDetails.length !== 0 ? details.campDetails[0].name : "--"}</span>
                            </div>   
                            <hr/>
                            <div style={elStyle}>
                                <span >City</span>  
                                <span>{details.campDetails.length !== 0 ? details.campDetails[0].city : "--" }</span>
                            </div>
                            <hr/>
                            <div style={elStyle}>                                
                                <span >Main Address</span>
                                <span>{details.campDetails.length !== 0 ? details.campDetails[0].address : "--" }</span>
                            </div>
                            
                        </Grid>
                        {/* <h3>Camp Details</h3> */}
                        <Grid item md={6} >                    
                            
                            <div style={elStyle}>
                                    <span >Area Covered</span>  
                                    <span>{details.campDetails.length !== 0 ? details.campDetails[0].area : "--"}</span>
                                </div>
                                <hr/>                        
                                <div style={elStyle}>
                                    <span >Registered on</span>  
                                    <span>{details.createdAt.split('T')[0]}</span>
                                </div>    
                                <hr/>      
                                <div style={elStyle}>
                                    <span >Registeration Status</span>  
                                    <span>{details.is_approved == true ? 
                                        <Stack direction="row" spacing={1} > 
                                            <Chip label="Approved" color="success" sx={{width: "100px"}} /> 
                                        </Stack> 
                                        : 
                                        <Stack direction="row" spacing={1}> 
                                            <Chip label="Pending" color="warning" sx={{width: "100px"}}/> 
                                        </Stack> 
                                    }</span>
                                </div>                                            
                        </Grid>
                        
                    </Grid>
        </SimpleCard>

        if(details.is_approved){
            approved = true
            btnTxt = "Approved"
        }
    }


    let modalData =     <ValidatorForm onSubmit={handleRegUpdate} onError={() => null}>
                <Grid container spacing={12} sx={{textAlign: 'center'}}>
                    <Grid item xs={12} sx={{ mt: 2 }} >     
                        <h2 style={{display: "block"}}>Approve Registeration </h2>                          
                        <StyledButton 
                            type="submit" 
                            color="success"
                            className="button"                                
                            variant="contained" 
                            disabled={loadingBtn}                             >                                
                                <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                                    {loadingBtn ? 'Processing...' : 'Approve'}
                                </Span>
                        </StyledButton>                                                                        
                    </Grid>                                       
                </Grid>

            </ValidatorForm>
    if(loading){
        modalData = <Loader />
    }
    return (
        <Container>

            {/* Snackbar */}
            <Snackbar 
                        open={isMessage} 
                        autoHideDuration={6000}  
                        anchorOrigin={{ vertical, horizontal }}
                        key={`${vertical},${horizontal}`} 
                        onClose={handleClose}
                        >
                    <Alert                                           
                        severity={messageColor}
                        sx={{ width: '100%' }}
                        variant="filled"
                    >
                        {message}
                    </Alert>
                </Snackbar>  

                {/* End Snackbar */}

            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Registerations', path: '/registerations'},
                        { name: 'Details'},
                    ]}
                />
            </div> 
             <Grid container>           
                <Grid item xs={5} className="d-flex">   
                        <StyledButton 
                            color="success"
                            className="button"
                            aria-label="Add user"
                            variant="outlined" 
                            disabled={approved} 
                            onClick={handleRegModalOpen}                             
                            >
                              {btnTxt}
                        </StyledButton>                          
                </Grid>                
            </Grid>          
            <Box py="12px" />
            {regDetails}            
            <br/>
            <br/>       

             {/* Approve Registerations Modal */}
            <Modal  handleModalClose={handleRegModalClose} open={openRegModal}>
                    {modalData}
            </Modal>
            {/* Approve Registerations Modal */}  
        </Container>        
    )
}

export default RegisterationDetails
