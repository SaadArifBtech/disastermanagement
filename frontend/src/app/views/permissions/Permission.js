import React from 'react'
import {
    TableRow,        
    Grid,  
    TableCell,    
    Stack,
    Chip,
    Icon
} from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Box, styled } from '@mui/system'
import {Span } from 'app/components/Typography'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios.js'


import AppButton from 'app/components/Button/Button'
import Auxilary from 'app/hoc/Auxilary'
import Modal from 'app/components/modals/ModalCustom'
import Loader from 'app/components/Loader/Loader'
import useAuth from 'app/hooks/useAuth'


const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Permission = ({permission, updated, update}) => {
    const[open, setOpen] = React.useState(false)
    const [allowed, setAllowed] = React.useState(null);
    const [loading, setLoading] = React.useState(false)

    React.useEffect(()=>{
        setAllowed(permission.allowedCreation)
    },[])
    
    const {getPermissions, user} = useAuth()

    
    const handleChange = (event) => {
        setAllowed(event.target.value);
    };

    const submit = async () => {
        setLoading(true)
        try{
            const res = await axios.post(`/api/permissions/${permission.id}`, {allowed})            
            getPermissions(res.data.user)            
            update(!updated)
            setOpen(false)
            setLoading(false)
        }
        catch(e){
            console.log(e)
        }
            
    }

    let modalContent = (
        <ValidatorForm onSubmit={submit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>                                             
                        <h3>Choose Permission</h3>
                    </Grid>
                    <Grid item lg={8} md={8} sm={12} xs={12} sx={{ mt: 2 }}>                        
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose Permission</InputLabel>
                            <Select
                                labelId="choose-permission"
                                id="choose-permission"
                                value={allowed}
                                label="Camp Permission"
                                onChange={handleChange}
                            >
                                <MenuItem value={true}>Allow</MenuItem>
                                <MenuItem value={false}>Disallow</MenuItem>                            
                            </Select>
                        </FormControl>                         
                    </Grid>      
                    <Grid item lg={12} sx={{display: "flex"}}>
                        <Box position="relative" style={{marginLeft: "auto"}}>
                            <AppButton   
                                color="success"                    
                                variant="contained" 
                                type="submit">                               
                                <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                                    Update 
                                </Span>
                            </AppButton>                       
                        </Box>
                    </Grid>              
                </Grid>
   

            </ValidatorForm>  
    )
    if(loading){
        modalContent = (
            <Loader></Loader>
        )
    }
  return (    
    <Auxilary>
        <TableRow>
            <TableCell>{permission.name}</TableCell>
            <TableCell>{permission.region}</TableCell>            
            <TableCell>{
                permission.allowedCreation == true ? 
                    <Stack direction="row" spacing={1}> 
                        <Chip label="Allowed" color="success" sx={{width: "100px"}} /> 
                    </Stack> 
                    : 
                    <Stack direction="row" spacing={1}> 
                        <Chip label="Not Allowed" color="error" sx={{width: "100px"}}/> 
                    </Stack> 
                    }
            </TableCell>
            <TableCell>                 
                <AppButton
                    color="success"                              
                    variant="outlined" 
                    click={() => setOpen(true)}
                    >
                        Edit
                </AppButton>                                                         
            </TableCell>
        </TableRow>   


        <Modal title="Edit Camp Permissions" handleModalClose={()=>setOpen(false)} open={open}>
                    {modalContent}
        </Modal>
    </Auxilary>
        
  )
}

export default Permission

