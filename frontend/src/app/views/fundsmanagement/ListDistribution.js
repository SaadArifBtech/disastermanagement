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
import ResourcePage from './FundsPage'


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


const ListDistribution = (props) => {


    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [userFund, setUserFund] = React.useState(null)
    const [updated, setUpdated] = React.useState(false)

    useEffect ( ()=>{      
        const getResources = async () =>{
            try{
                const response = await axios.get('/api/funds/viewdistribute')                 
                const transforemd = response.data.map((el)=>{
                    return {
                        id: el._id,
                        name:el.name,
                        providercategory: el.distributedby,
                        city: el.city,
                        transfertype: el.transfertype,
                        accountno: el.accountno,
                        cnic: el.cnic,
                        
                        amountrecieved:el.amountrecieved,
                       

                       
                    }
                })                        
                setUserFund(transforemd) 
                
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
    if(userFund){        
        content = (
            <Auxilary>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell> Name  </TableCell>
                            <TableCell> Distributed By  </TableCell>
                            <TableCell>City </TableCell>
                            <TableCell>CNIC  </TableCell>
                            <TableCell>Transfer type  </TableCell>
                            <TableCell>Reciever Account No  </TableCell>
                            <TableCell>Amount Recieved  </TableCell>
                         
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userFund.map((el)=>{   
                            console.log(el)   
                            return (
                               <TableRow>
                                <TableCell>{el.name}</TableCell>
                                <TableCell>{el.providercategory}</TableCell>
                                <TableCell>{el.city}</TableCell>
                                <TableCell>{el.cnic}</TableCell>
                                <TableCell>{el.transfertype}</TableCell>
                                <TableCell>{el.accountno}</TableCell>
                                <TableCell>{el.amountrecieved}</TableCell>
                             
                               </TableRow>
                            )                      
                        })}
                    </TableBody>
                </StyledTable>                   
            
                <TablePagination
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userFund.length}
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

export default ListDistribution
