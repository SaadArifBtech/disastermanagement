import React from 'react'
import Auxilary from 'app/hoc/Auxilary'

import permissionDenied from '../../../assets/animations/permission-denied.gif'

const styles = {
    conatinerDiv: {
        display: "flex",
        alignItems: "center",        
        justifyContent: "center",
        flexDirection: "column",
        height: "500px"
    },
    img: {
        width: "300px",
        height: "200px"
    },
    title: {
        color: "#e64a3c",
        textDecoration: "underlined",
        fontSize: "40px"
    },
    msg: {
        fontSize: "20px"
    }
}
const Message = (props) => {
  return (
    <Auxilary>
        <div style={styles.conatinerDiv}>
            <h1 style={styles.title}>{props.title}</h1>
            <img src={permissionDenied} style={styles.img}/>
            <p style={styles.msg}>{props.message}</p>
        </div>
    </Auxilary>
  )
}

export default Message