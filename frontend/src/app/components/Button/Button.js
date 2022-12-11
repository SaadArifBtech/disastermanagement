import React from 'react'
import { styled } from '@mui/system'
import {Button} from '@mui/material'

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}))

const AppButton = (props) => {
  return (
        <StyledButton
            color={props.color}
            className="button" 
            type={props.type ? props.type : "button"}           
            variant={props.variant}
            onClick={props.click}
            >
                {props.children}
        </StyledButton> 
  )
}

export default AppButton