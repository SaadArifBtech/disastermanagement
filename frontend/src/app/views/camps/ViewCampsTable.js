import {
    Button,
    Table, 
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TablePagination,
    Stack,
    Chip
} from '@mui/material'
import React, { useEffect } from 'react'
import { Box, styled } from '@mui/system'
import { Link } from 'react-router-dom'
import Loader from 'app/components/Loader/Loader'
import Auxilary from 'app/hoc/Auxilary'

import axios from 'axios.js'







const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}))




const ViewCampsTable = (props) => {


    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [emergencyCamps, setEmergencyCamps] = React.useState(null)       
    const [updated, setUpdated] = React.useState(false)

    useEffect ( ()=>{      
        const getUsers = async () =>{
            const response = await axios.get('/api/emergency-camps/view')                
            setEmergencyCamps(response.data)              
            const trans = Object.entries(response.data).map((e) => ( { ...e[1] } ));
            console.log(trans)
            const transformed = trans.map((value) => {
                return {
                    coordinates: {
                        lat: value.coordinates[0],
                        lng: value.coordinates[1]
                    },
                    id: value._id,
                    city: value.city,
                    province: value.province,                    
                    address: value.address,                    
                    name: value.name,
                    total_tents: value.slots,
                    registerations: value.registerations,
                }
            })  
            props.setMarkers(transformed)       
        }

        getUsers()
             
    },[updated])
   
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
 
    let tbody = null
    let pagination = null
    if(emergencyCamps){      
        tbody =  (
            emergencyCamps
            .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            )
            .map(camp => (
                <TableRow key={camp._id}>
                    <TableCell>{camp.name}</TableCell>
                    <TableCell>{camp.city}</TableCell>
                    <TableCell>{camp.slots}</TableCell>
                    <TableCell>{camp.CreatedBy[0]['name']}</TableCell>
                    <TableCell>{
                        camp.allowed_registerations == true ? 
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
                        <Link to={'/emergency-camps/'+camp._id}>                                        
                               <StyledButton
                                color="success"
                                className="button"
                                aria-label="Add user"
                                variant="outlined" 
                                >
                                    view details
                               </StyledButton>                                         
                        </Link>
                    </TableCell>
                </TableRow>
            ))        
        )
        pagination =  <TablePagination
            sx={{ px: 2 }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={emergencyCamps.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
                'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
                'aria-label': 'Next Page',
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    }
    let content = <Loader />
    if(emergencyCamps){
        content = (
            <Auxilary>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Available SLots</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Registerations Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {tbody}
                    </TableBody>
                </StyledTable>                   
            {pagination}
           </Auxilary>
        )
    }    
    return (
        <Box width="100%" overflow="auto">
            {content}
        </Box>
    )
}

export default ViewCampsTable
