import { fontWeight } from '@mui/system'
import { Grid } from '@mui/material'
import React from 'react'

const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between"
    },
    text: {
        fontSize: "16px",
        color: "#d81e1e",
        fontWeight: "bold",
        marginTop: "20px"
    }, 
    title :{
        fontSize: "16px",        
        marginTop: "20px"
    }
}

const StatCell = (props) => {
  return (
    <Grid container>
        <Grid item sm={8}>
            <div style={styles.container}>
                <div style={{marginTop: "20px"}}>
                    <span style={styles.title}>{props.title}</span>
                    <small>{props.desc}</small>
                </div>
                <span style={styles.text}>{props.info}</span>
            </div>
        </Grid>
    </Grid>
    
  )
}

export default StatCell