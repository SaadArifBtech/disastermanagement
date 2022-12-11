import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@mui/material'
import React, { useEffect } from 'react'
import { Box, styled } from '@mui/system'
import { useTheme } from '@mui/system'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContentText from '@mui/material/DialogContentText'
import { Alert, Snackbar } from '@mui/material'
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




const UsersTable = () => {

    const Modal = (props) => {  
        const theme = useTheme()
        const fullScreen = useMediaQuery(theme.breakpoints.down('sm')) 
        const [open, setOpen] = React.useState(false)
        const [vertical, setVertical] = React.useState('top')
        const [horizontal, setHorizontal] = React.useState('right')
        const [user, setUser]= React.useState(props.user)                 
    
        const handleDelete = async () =>{
            const response = await axios.delete(`/api/users/delete/${user._id}`) 
            if(response.data.message){
                setOpen(false)     
                setMessage(true)
                
                if(updated === true){
                    setUpdated(false)
                }
                else{
                    setUpdated(true)
                }
            }
        }
        
        function handleClickOpen() {
            setOpen(true)
        }
    
        
        function handleClose() {
            setOpen(false)
            setMessage(false)
        }
        return (
            <div>
               <TableCell>
                    <IconButton 
                        onClick={handleClickOpen}
                    >
                        <Icon color="error">close</Icon>
                    </IconButton>
                </TableCell>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Delete this user?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Are you sure you want to delete this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
    
                <Snackbar 
                        open={message} 
                        autoHideDuration={6000}  
                        anchorOrigin={{ vertical, horizontal }}
                        key={`${vertical},${horizontal}`} 
                        onClose={handleClose}>
                    <Alert                                           
                        severity="success"
                        sx={{ width: '100%' }}
                        variant="filled"
                    >
                        User deleted successfully!
                    </Alert>
                </Snackbar>
            </div>
        )
    }

    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [users, setUsers] = React.useState([])
    const [message, setMessage]=React.useState(false)    
    const [updated, setUpdated] = React.useState(false)

    useEffect ( ()=>{      
        const getUsers = async () =>{
            const response = await axios.get('/api/users/getusers')                
            setUsers(response.data)          
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

    return (
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((user, index) => (
                             
                            <TableRow key={index}>
                                <TableCell align="left">
                                    {user.name}
                                </TableCell>
                                <TableCell align="left">
                                    {user.email}
                                </TableCell>
                                {user.username != '' ? <TableCell>{user.username}</TableCell> : <TableCell>Not provided</TableCell>}                                
                                <TableCell>active</TableCell>
                                <TableCell>{user.role}</TableCell>                             
                                <Modal user={user}/>
                            </TableRow>                                
                            

                        ))}
                </TableBody>
            </StyledTable>

            <TablePagination
                sx={{ px: 2 }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
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
        </Box>
    )
}

export default UsersTable
