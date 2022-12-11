import React, { Component } from 'react'
import withParams from 'app/hoc/withParams'
import { Breadcrumb } from 'app/components'
import { Box, styled } from '@mui/system'

import { useNavigate } from 'react-router-dom'
import { Button,            
        Grid,  
        Snackbar, 
        Alert,    
        Stack,
        Chip,
        Icon
    } 

from '@mui/material'
import Modal from 'app/components/modals/ModalCustom'
import {H6, H5, Span } from 'app/components/Typography'
import Loader from 'app/components/Loader/Loader'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import StatCards from '../inc/StatCards'
import DetailsCard from '../inc/DetailsCard'
import CampDetailsTable from '../inc/CampDetailsTable'
import { Navigate } from 'react-router-dom'
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


class CampDetails extends Component {
    
    constructor(){
        super()        
    }    

    state = {        
        rowsPerPage: 5,        
        page: 0,
        details: null,
        camps: null,
        areaDetails: {
            name: "",
            city: "",
            province: "",
            area: "",
            address: "",
            local_address: ""
        },
        creater: "",
        updated: false,
        openDeleteModal: false,
        openEditModal: false,
        openRegModal: false,
        isMessage: false,
        vertical: "top",
        horizontal: "right",
        loading: false,
        message: "",
        messageColor: "success",        
    }

    

    loadData(id){
        axios.get(`/api/emergency-camps/${id}`)
        .then(response=>{            
            const areaDetails = this.state.areaDetails
            const updatedAreaDetails = {...areaDetails}        
            updatedAreaDetails["name"] = response.data[0].name
            updatedAreaDetails["city"] = response.data[0]['city']
            updatedAreaDetails["province"] = response.data[0]['province']
            updatedAreaDetails["address"] = response.data[0].address
            updatedAreaDetails["local_address"] = response.data[0].local_address
            updatedAreaDetails["area"] = response.data[0].area            
            this.setState({
                creater: response.data[0].CreatedBy[0]['name'],
                details: response.data[0],            
                areaDetails: updatedAreaDetails,            
            })        
        })
        .catch(err=>{
            console.log("[CampDetails]" + err)
        })


        axios.get(`/api/emergency-camps/camps/${id}`)   
        .then(response=>{
            this.setState({
                camps: response.data
            })
        })
        .catch(err=>{
            console.log("[CampDetails]" + err)
        })
    }

    //  Delete Modal Handler functions
    openDeleteModalHandler = () => {
        this.setState({
            openDeleteModal: true
        })
    }

    closeDeleteModalHandler =()=>{
        this.setState({
            openDeleteModal: false
        })
    }
    

    // Edit Modal Handler functions
    openEditModalHandler = () => {
        this.setState({
            openEditModal: true
        })
    }

    closeEditModalHandler = () => {
        this.setState({
            openEditModal: false
        })
    }

    // Registerations Modal Handler functions     
    openRegModalHandler = () => {
        this.setState({
            openRegModal: true
        })
    }
    closeRegModalHandler = () => {
        this.setState({
            openRegModal: false
        })
    }


    // Pagination Handlers
    pageChangeHandler = (event, newPage) => {
        this.setState({
            page: newPage
        })
    }

    changeRowsPerPageHandler = (event) => {
    
        this.setState({
            rowsPerPage: +event.target.value,
            page: 0
        })        
    }

    handleChange = (event) => {
        const updatedAreaDetails = {...this.state.areaDetails}
        updatedAreaDetails[event.target.name] = event.target.value
        this.setState({
            areaDetails: updatedAreaDetails
        })
    }

    // Edit form submit handler 
    submitHandler = () => {            
        this.setState({
            loading: true
        })            
        try{
            const data = {...this.state.areaDetails}
            axios.put(`/api/emergency-camps/edit/${this.props.params.id}`, data)
            .then(response=>{                                        
                const areaDetails = this.state.areaDetails
                const updatedAreaDetails = {...areaDetails}        
                updatedAreaDetails["name"] = response.data.campInfo.name
                updatedAreaDetails["city"] = response.data.campInfo.city
                updatedAreaDetails["address"] = response.data.campInfo.address
                updatedAreaDetails["local_address"] = response.data.campInfo.local_address
                updatedAreaDetails["area"] = response.data.campInfo.area       

                const updatedDetails = {...this.state.details}
                updatedDetails["name"] = response.data.campInfo.name
                updatedDetails["city"] = response.data.campInfo.city
                updatedDetails["address"] = response.data.campInfo.address
                updatedDetails["local_address"] = response.data.campInfo.local_address
                updatedDetails["area"] = response.data.campInfo.area

                this.setState({
                    details: updatedDetails,
                    areaDetails: updatedAreaDetails,                    
                    message: response.data.message,
                    messageColor: "success",
                    isMessage: true,
                    openEditModal: false,
                    loading: false,                                    
                })
            })            
            setTimeout(()=>{
                this.setState({
                    isMessage: false
                })
            },3000)
        }
        catch(e){
            console.log(e.message)
            this.setState({
                loading: false,
                message: e.message,
                messageColor: "error",
                isMessage: true
            })            
        }
    }

    deleteCampHandler = async() => {
        try{
            this.setState({
                loading: true
            })            
            const response = await axios.delete(`/api/emergency-camps/delete/${this.props.params.id}`)
            this.setState({
                message: `${response.data.message} redirecting...`,
                messageColor: "success",
                isMessage: true,                
            })                
            setTimeout(function() {           
                this.props.navigate('/emergency-camps')                     
              }, 2000);  
        }
        catch(e){
            this.setState({
                message: e.message,
                loading: false,
                messageColor: 'error',
                isMessage: true
            })            
        }
    }

    regUpdateHandler = async() => {
        try{
            this.setState({
                loading: true
            })            
            let status;
            if(this.state.details.allowed_registerations == true){
                status = 'disable'
            }else{
                status = 'enable'
            }
            const data = {status: status}
            const response = await axios.put(`/api/emergency-camps/update-registerations/${this.props.params.id}`, data)          
            const updatedDetails = {...this.state.details}                                                
            updatedDetails["allowed_registerations"] = response.data.campInfo.allowed_registerations
           
            this.setState({
                details: updatedDetails,
                message: response.data.message,
                messageColor: "success",
                isMessage: true,
                openRegModal: false,
                loading: false    
            })
          
        }catch(e){
            this.setState({
                message: e.message,
                messageColor: "error",
                isMessage: true,                
                loading: false    
            })   
        }
    }

  render() {        
    let dataCard = null 
    let btnText = "Enable";
    if(this.state.details){          
            dataCard = (
                    <DetailsCard details = {this.state.details} creater={this.state.creater}/>
            )   
            if(this.state.details.allowed_registerations){
                btnText = "Disable"
            }else{
                btnText = "Enable"
            }
          

    }  
    const vertical = this.state.vertical
    const horizontal = this.state.horizontal

    let table = <Loader />
    if(this.state.camps){
        table = <CampDetailsTable 
            camps={this.state.camps} 
            page={this.state.page} 
            rowsPerPage={this.state.rowsPerPage}
            changeRow = {this.changeRowsPerPageHandler}
            changePage = {this.pageChangeHandler}
            />
    }   

    let editModalContent = (
     <ValidatorForm onSubmit={this.submitHandler} onError={() => null}>
            <Grid container spacing={6}>                    
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                        
                    <TextField
                        label="Name"
                        onChange={this.handleChange}
                        type="text"
                        name="name"
                        value={this.state.areaDetails.name || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        type="text"
                        name="city"
                        id="city"
                        onChange={this.handleChange}
                        value={this.state.areaDetails.city || ''}
                        validators={[
                            'required',
                        ]}
                        label="City"
                        errorMessages={['this field is required']}
                    />
                   
                    <TextField
                        label="Main address"
                        onChange={this.handleChange}
                        type="text"
                        name="address"
                        value={this.state.areaDetails.address || ''}
                        validators={['required']}
                        errorMessages={[
                            'this field is required',                                
                        ]}
                    />

                
                    
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                        <TextField
                                label="Local Address"
                                onChange={this.handleChange}
                                type="text"
                                name="local_address"
                                value={this.state.areaDetails.local_address || ''}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                             <TextField
                                type="text"
                                name="province"
                                id="province"
                                onChange={this.handleChange}
                                value={this.state.areaDetails.province || ''}
                                validators={[
                                    'required',
                                ]}
                                label="Province"
                                errorMessages={['this field is required']}
                            />
                        <TextField                            
                                label="Covered Area"
                                onChange={this.handleChange}
                                type="number"
                                name="area"
                                value={this.state.areaDetails.area || ''}
                                validators={[
                                    'required'                                
                                ]}
                                errorMessages={['this field is required']}
                            />                                                                             
                </Grid>
            </Grid>
            <Box position="relative">
                <StyledButton   
                    color="success"
                    className="button"
                    aria-label="Add user"
                    variant="outlined" 
                    type="submit">
                    <Icon>done</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Update 
                    </Span>
                </StyledButton>                       
            </Box>

        </ValidatorForm>        
        )
        if(this.state.loading) {
            editModalContent = <Loader />
        }


        // registeration modal settings 
        let regModalData = (
            <ValidatorForm onSubmit={this.regUpdateHandler} onError={() => null}>
            <Grid container spacing={12} sx={{textAlign: 'center'}}>
                <Grid item xs={12} sx={{ mt: 2 }}>     
                    <h2>Confirm this action!</h2>                          
                    <StyledButton
                    color={btnText === "Enable" ? "success" : "error"}
                    className="button"
                    aria-label="Add user"
                    variant="contained" 
                    type="submit"
                    >
                         <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                                {btnText}
                             </Span>
                    </StyledButton>                                                                                           
                </Grid>                                      
            </Grid>                
         </ValidatorForm>
        )
        if(this.state.loading){
            regModalData = <Loader />
        }
        // Delete Modal Settings 
        let deleteModalData = (
            <ValidatorForm onSubmit={this.deleteCampHandler} onError={() => null}>
            <Grid container spacing={12} sx={{textAlign: 'center'}}>
                <Grid item xs={12} sx={{ mt: 2 }}>     
                    <h2 className="mb-3">Are you sure you want to delete this camp?</h2>                          
                    <StyledButton 
                        color="error"
                        className="button"
                        aria-label="Delete"
                        variant="contained" 
                        type="submit"
                        >                                
                             <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                                Confirm
                             </Span>
                    </StyledButton>  
                    <p style={{marginTop: "16px"}}>This action is irreversible</p>                                                                      
                </Grid>                
            </Grid>                
         </ValidatorForm>
        )
        if(this.state.loading){
            deleteModalData = <Loader />
        }
    return (
      <Container>
         {/* Snackbar */}
         <Snackbar 
                open={this.state.isMessage} 
                autoHideDuration={6000}  
                anchorOrigin={{vertical, horizontal }}
                key={`${this.state.vertical},${this.state.horizontal}`} 
                // onClose={handleClose}
                >
            <Alert                                           
                severity={this.state.messageColor}
                sx={{ width: '100%' }}
                variant="filled"
            >
                {this.state.message}
            </Alert>
        </Snackbar>  
        <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Dashboard', path: '/dashboard' },
                        { name: 'Emergency Camps', path: '/emergency-camps'},
                        { name: 'Details'},
                    ]}
                />
        </div> 

        <StatCards id={this.props.params.id}/>
             <Grid container>                
                <Grid item xs={12} sx={{display: "flex"}} >                      
                        <StyledButton
                            color="info"
                            className="button"
                            aria-label="Add user"
                            variant="outlined" 
                            onClick={this.openRegModalHandler}
                        >
                         {btnText}  
                        </StyledButton>
                        <StyledButton
                            color="success"
                            className="button"
                            aria-label="Add user"
                            variant="outlined" 
                            onClick={this.openEditModalHandler}
                        >
                            Edit Camp  
                        </StyledButton>
                        <StyledButton
                            color="error"
                            className="button"
                            aria-label="Add user"
                            variant="outlined" 
                            onClick={this.openDeleteModalHandler}
                        >
                            Delete Camp  
                        </StyledButton>                        
                </Grid>
                
            </Grid> 
            <Box py="12px" />
            {dataCard}
            {table}         


            {/*Delete Emergency Camp Modal  */}
            <Modal handleModalClose={this.closeDeleteModalHandler} open={this.state.openDeleteModal}>
                {deleteModalData}
            </Modal>      
            {/*End Delete Emergency Camp Modal  */}

            {/*Edit Emergency Camp Modal  */}
            <Modal title="Edit Camp Details" handleModalClose={this.closeEditModalHandler} open={this.state.openEditModal}>
               {editModalContent}
            </Modal>
            {/* End Edit Emergency Camp Modal  */}     


            {/* Disable/Enable Registerations Modal */}
            <Modal  handleModalClose={this.closeRegModalHandler} open={this.state.openRegModal}>
                {regModalData}
            </Modal> 
            {/*End Disable/Enable Registerations Modal */}

            
      </Container>
    )
  }

  componentDidMount(){       
      this.loadData(this.props.params.id)      
  }


  componentDidUpdate(prevProps){
    if(this.props.params.id !== prevProps.params.id){
        this.loadData(this.props.params.id)
    }
  }
}

export default withParams(CampDetails)