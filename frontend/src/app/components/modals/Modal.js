import React from 'react'
import { useTheme } from '@mui/system'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContentText from '@mui/material/DialogContentText'

export default function Modal({open}) {
    const [open, setOpen] = React.useState(open)
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
   
    function handleClose() {
        setOpen(false)
    }

    return (
        <div>
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
                       Are you sure you want to delete this users?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
