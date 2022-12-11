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


const ListFund = (props) => {


    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [userFund, setUserFund] = React.useState(null)
    const [updated, setUpdated] = React.useState(false)

    useEffect ( ()=>{      
        const getResources = async () =>{
            try{
                const response = await axios.get('/api/funds/view')                 
                const transforemd = response.data.map((el)=>{
                    return {
                        id: el._id,
                        name:el.name,
                        providercategory: el.providercategory,
                        taxid: el.taxid,
                        transfertype: el.transfertype,
                        accountno: el.accountno,
                        details: el.details,
                        
                        amountrecieved:el.amountrecieved,
                        accountreceieved:el.accountreceieved,
                        bankname:el.bankname,

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
                            <TableCell>Fund Provider Name  </TableCell>
                            <TableCell>Category  </TableCell>
                            <TableCell>Tax id  </TableCell>
                            
                            <TableCell>Transfer type </TableCell>
                            <TableCell>Payer Account No </TableCell>
                            <TableCell>Amount Recieved </TableCell>
                            <TableCell>Account  Recieved </TableCell>
                            <TableCell>Bank Name </TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userFund.map((el)=>{   
                            console.log(el)   
                            return (
                               <TableRow>
                                <TableCell>{el.name}</TableCell>
                                <TableCell>{el.providercategory}</TableCell>
                                <TableCell>{el.taxid}</TableCell>
                                <TableCell>{el.transfertype}</TableCell>
                                <TableCell>{el.accountno}</TableCell>
                                <TableCell>{el.amountrecieved}</TableCell>
                                <TableCell>{el.accountreceieved}</TableCell>
                                <TableCell>{el.bankname}</TableCell>
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

export default ListFund
