import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const AppSelect = (props) => {
  return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select                                
                value={props.default}
                label=""
                onChange={(event) =>props.change(event.target.value)}
            >
                {
                    props.options.map(op=>{
                       return <MenuItem value={op.value}>{op.title}</MenuItem>
                    })
                }
                
            </Select>
        </FormControl>   
  )
}

export default AppSelect