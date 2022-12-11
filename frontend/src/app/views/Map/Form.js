// import React, {useState} from 'react'
// import {    
//     Icon,
//     Grid, 
//     Snackbar,
//     Alert
// } from '@mui/material'
// import { Span } from 'app/components/Typography'
// import { styled, Box } from '@mui/system'
// import Auxilary from 'app/hoc/Auxilary';
// import Button from 'app/components/Button/Button'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios.js'
// import Loader from 'app/components/Loader/Loader';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

// const TextField = styled(TextValidator)(() => ({
//     width: '100%',
//     marginBottom: '16px',
// }))

// const Form = (props) => {
 
//     const [name, setName] = React.useState("")
//     const [city, setCity] = React.useState("")
//     const [campSize, setCampSize] = React.useState("")
//     const [beds, setBeds] = React.useState("")
//     const [message, setMessage]=useState('')
//     const [province, setProvince] = React.useState("")
//     const[messageColor, setMessageColor]=useState('success')
//     const[loading, setLoading] = useState(false)
//     const[isMessage, setIsMessage] = useState(false)
//     const [vertical, setVertical] = React.useState('top')
//     const [horizontal, setHorizontal] = React.useState('right')

//     const navigate = useNavigate()

//     const addArea = async () => {
        
//         const data = {
//             name,
//             city,
//             camp_size: campSize,
//             beds,
//             province: props.province ? props.province : province,
//             address: props.address,
//             local_address: props.local_address,
//             coordinates: [props.coordinates.lat, props.coordinates.lng],
//             area: props.area
//         }

//         setLoading(true)
        

//         axios.post('/api/emergency-camps/add', data)            
//         .then(res => {          
//             // console.log(res)
//             setMessage('Camp Created Successfully, redirecting...')
//             setMessageColor('success')
//             setIsMessage(true)
//             setTimeout(function() {
//                 navigate('/emergency-camps')
//               }, 2000);    
//             setLoading(false) 
//         })
//         .catch(err => {
//             setMessage(e.message)
//             setLoading(false)
//             setMessageColor('error')
//             setIsMessage(true)
//         })
        
//     }
//     let form = (
//         <ValidatorForm onSubmit={addArea} onError={() => null}>    
            
//         <Grid container spacing={6}>                    
//             <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>                        
//                 <TextField
//                     label="Name"
//                     onChange={(e)=>setName(e.target.value)}
//                     type="text"
//                     name="name"
//                     value={props.name || name}
//                     validators={['required']}
//                     errorMessages={['this field is required']}
//                 />
//                 <TextField
//                     type="text"
//                     name="city"
//                     id="city"
//                     onChange={(e)=>setCity(e.target.value)}
//                     value={props.city || city}
//                     validators={[
//                         'required',
//                     ]}
//                     label="City"
//                     errorMessages={['this field is required']}
//                 />
//                 <TextField
//                     type="text"
//                     name="province"
//                     id="province"
//                     onChange={(e)=>setProvince(e.target.value)}
//                     value={props.province || province}
//                     validators={[
//                         'required',
//                     ]}
//                     label="Province"
//                     errorMessages={['this field is required']}
//                 />
//                 <TextField
//                     label="Main address"
//                     onChange={(e)=>{}}
//                     type="text"
//                     name="address"
//                     value={props.address || ''}
//                     validators={['required']}
//                     errorMessages={[
//                         'this field is required',                                
//                     ]}
//                 />

//             <TextField
//                     label="Local Address"
//                     onChange={()=>{}}
//                     type="text"
//                     name="local_address"
//                     value={props.local_address || ''}
//                     validators={['required']}
//                     errorMessages={['this field is required']}
//                 />
            
                
//             </Grid>

//             <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
        
//             <TextField                            
//                     label="Covered Area m²"
//                     onChange={()=>{}}
//                     type="number"
//                     name="area"
//                     value={props.area || ''}
//                     validators={[
//                         'required'                                
//                     ]}                
//                     errorMessages={['this field is required']}
//                 />
//                 <TextField
//                     label="Camp Size"
//                     onChange={(e)=>setCampSize(e.target.value)}
//                     type="number"
//                     name="camp_size"
//                     value={props.camp_size || campSize}
//                     validators={['required']}
//                     errorMessages={['this field is required']}
//                 />
//                 <TextField
//                     label="beds"
//                     onChange={(e)=>setBeds(e.target.value)}
//                     name="beds"
//                     type="number"
//                     value={props.beds || beds}
//                     validators={['required']}
//                     errorMessages={['this field is required']}
//                 />
                    
//                 <input type="hidden" value={props.creater_id} name="creater"/>
//             </Grid>
//         </Grid>
//         <Box position="relative">
//             <Button color="primary" variant="contained"  type="submit">
//                 <Icon>done</Icon>
//                 <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
//                     Create Camp
//                 </Span>
//             </Button>       
//         </Box>            
//     </ValidatorForm>
//     )

//     if(loading){
//         form = <Loader/>
//     }
//     if(isMessage){
//         form = <p style={{textAlign: "center"}}>{message}</p>
//     }
//   return (
//     <Auxilary>
//         <Snackbar 
//                 open={isMessage} 
//                 autoHideDuration={6000}  
//                 anchorOrigin={{ vertical, horizontal }}
//                 key={`${vertical},${horizontal}`} 
//                 onClose={()=>setIsMessage(false)}
//                 >
//             <Alert                                           
//                 severity={messageColor}
//                 sx={{ width: '100%' }}
//                 variant="filled"
//             >
//                 {message}
//             </Alert>
//         </Snackbar>         
//         {form}
//     </Auxilary>
//   )
// }

// export default Form