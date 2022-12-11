import {        

    Table, 
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Button,
    Chip,
    Stack,
    TablePagination,
} from '@mui/material'
import React, { useEffect } from 'react'
import { Box, styled } from '@mui/system'
import { Link } from 'react-router-dom'
import axios from 'axios.js'
import Auxilary from 'app/hoc/Auxilary'
import Loader from 'app/components/Loader/Loader'






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



const AllRegisterationsTable = () => {
   
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [allRegs, setAllRegs] = React.useState(null)
    const [message, setMessage]=React.useState(false)    
    const [updated, setUpdated] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    useEffect ( ()=>{      
        const getUsers = async () =>{
            const response = await axios.get('/api/registerations/view-registerations')                
            setAllRegs(response.data)          
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

    function handleClickOpen() {
        setOpen(true)
    }
    let regs = null
    let pagination = null 
    if(allRegs){
        pagination =   <TablePagination
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={allRegs.length}
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
        regs =  ( allRegs.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                ).map(reg => (
                    <TableRow key={reg._id}>
                        <TableCell>{reg.campDetails[0] ? reg.campDetails[0].name : '--'}</TableCell>
                        <TableCell>{reg.campDetails[0] ? reg.campDetails[0].local_address : '--'}</TableCell>
                        <TableCell>{reg.effecteeDetails[0] ? reg.effecteeDetails[0].name : '--'}</TableCell>
                        <TableCell>{reg.createdAt.split('T')[0]}</TableCell>
                        <TableCell>{
                            reg.is_approved == true ? 
                                <Stack direction="row" spacing={1} > 
                                    <Chip label="Approved" color="success" sx={{width: "100px"}} /> 
                                </Stack> 
                                : 
                                <Stack direction="row" spacing={1}> 
                                    <Chip label="Pending" color="warning" sx={{width: "100px"}}/> 
                                </Stack> 
                                }
                        </TableCell>                        
                        <TableCell> 
                            <Link to={'/registerations/'+ reg._id}>                                        
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


    }   
   let content = <Loader />
   if(allRegs !== null){
    content = (
            <Auxilary>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Camp Name</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Effectee Name</TableCell>
                            <TableCell>Registeration Date</TableCell>
                            <TableCell>Registerations Status</TableCell>
                            <TableCell>Action </TableCell>                        
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {regs}
                    </TableBody>
                </StyledTable>                     
                {pagination}
            </Auxilary>
        )
   }
   
    return (        
            <Box width="100%" >
                {content}
            </Box>                 
    )
}

export default AllRegisterationsTable
