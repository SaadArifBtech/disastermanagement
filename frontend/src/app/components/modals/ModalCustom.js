import React , { useRef, useEffect} from 'react'
import { useTheme } from '@mui/system'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContentText from '@mui/material/DialogContentText'
import equal from 'fast-deep-equal'

export default function Modal(props) {
    const [open, setOpen] = React.useState(props.open)    
    const theme = useTheme()   
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  
        const ref = useRef();
        ref.current = props.open

      useEffect(() => {
        
        const {open } = props
        const prevProps = ref.current;
        if(prevProps.open !== open) {
            setOpen(props.open)
        }

    }, [props.open]) 

    function handleClose() {
        setOpen(false)
        props.handleModalClose(false)    
    }
       
    return (
        <div>
         
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                fullWidth={true}
            >
                <DialogTitle id="responsive-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       {props.text}
                    </DialogContentText>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


