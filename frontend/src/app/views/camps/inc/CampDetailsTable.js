import React from 'react'
import { SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { Table,TableHead, TableBody,TableRow, TableCell, TablePagination } from '@mui/material'
import Auxilary from 'app/hoc/Auxilary'

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


const CampDetailsTable = (props) => {     
  return (
    <Auxilary>
        <h3>Mini Camps Details</h3>
        <SimpleCard>
            <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Camp No</TableCell>
                                <TableCell>Camp size</TableCell>
                                <TableCell>Beds</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.camps
                                .slice(
                                    props.page * props.rowsPerPage,
                                    props.page * props.rowsPerPage + props.rowsPerPage
                                ).map(camp=>{
                                    return (
                                        <TableRow key={camp._id}>
                                            <TableCell>{camp.camp_no}</TableCell>
                                            <TableCell>{camp.camp_size}</TableCell>
                                            <TableCell>{camp.beds}</TableCell>
                                            <TableCell>{camp.is_occupied ? "Occupied" :  "Available"}</TableCell>
                                        </TableRow>
                                    )
                                })                                
                            }
                        </TableBody>                   
                    </StyledTable>                
                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={props.camps.length}
                        rowsPerPage={props.rowsPerPage}
                        page={props.page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onPageChange={props.changePage}
                        onRowsPerPageChange={props.changeRow}
                    />
                </Box>
        </SimpleCard>
    </Auxilary>
  )
}

export default CampDetailsTable