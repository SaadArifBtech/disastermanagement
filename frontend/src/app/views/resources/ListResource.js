import {
    Button,
    Table, 
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TablePagination,    
} from '@mui/material'
import React, { useEffect } from 'react'
import { Box, styled } from '@mui/system'

import Loader from 'app/components/Loader/Loader'
import axios from 'axios.js'
import Auxilary from 'app/hoc/Auxilary'
import ResourcePage from './ResourcePage'


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


const ListResource = (props) => {


    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [userResources, setUserResources] = React.useState(null)
    const [updated, setUpdated] = React.useState(false)

    useEffect ( ()=>{      
        const getResources = async () =>{
            try{
                const response = await axios.get('/api/resources/view')                 
                const transforemd = response.data.map((el)=>{
                    return {
                        id: el._id,
                        name: el.Name,
                        type:el.type_of_resource,
                        details: el.Details,
                        location:el.Location_assigned,
                        status:el.Status,
                        quantity:el.Quantity,

                       
                    }
                })                        
                setUserResources(transforemd) 
                
            }
            catch(e){
                console.log(e)
            }
            
                       
        }
        getResources()
             
    },[])
   
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    let content = <Loader />
    if(userResources){        
        content = (
            <Auxilary>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name : </TableCell>
                            <TableCell>Type :</TableCell>
                            <TableCell>Details :</TableCell>
                            
                            <TableCell>Location Assigned :</TableCell>
                            <TableCell>Quantity :</TableCell>
                            <TableCell>Status :</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userResources.map((el)=>{   
                          
                            return (
                               <TableRow>
                                <TableCell>{el.name}</TableCell>
                                <TableCell>{el.type}</TableCell>
                                <TableCell>{el.details}</TableCell>
                                <TableCell>{el.location}</TableCell>
                                <TableCell>{el.quantity}</TableCell>
                                <TableCell>{el.status}</TableCell>
                               </TableRow>
                            )                      
                        })}
                    </TableBody>
                </StyledTable>                   
            
                <TablePagination
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userResources.length}
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
           </Auxilary>
        )
    }    
    return (
        <Box width="100%" overflow="auto">
            {content}
        </Box>
    )
}

export default ListResource
