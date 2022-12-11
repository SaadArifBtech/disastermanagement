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
import Permission from './Permission'


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


const PermissionsTable = (props) => {


    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [userPermissions, setUserPermissions] = React.useState(null)
    const [updated, setUpdated] = React.useState(false)

    useEffect ( ()=>{      
        const getPermissions = async () =>{
            try{
                const response = await axios.get('/api/permissions')                 
                const transforemd = response.data.map((el)=>{
                    return {
                        id: el._id,
                        name: el.user[0].name,
                        allowedCreation: el.permissions.createCamp,
                        region:el.user[0].province
                    }
                })                        
                setUserPermissions(transforemd) 
                
            }
            catch(e){
                console.log(e)
            }
            
                       
        }
        getPermissions()
             
    },[updated])
   
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    let content = <Loader />
    if(userPermissions){        
        content = (
            <Auxilary>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Region</TableCell>
                            <TableCell>Camp Permissions</TableCell>                            
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userPermissions.map((el)=>{      
                            return (
                                <Permission key={el.id} permission={el} updated={updated} update={setUpdated}/>
                            )                      
                        })}
                    </TableBody>
                </StyledTable>                   
            
                <TablePagination
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userPermissions.length}
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

export default PermissionsTable
