import React from 'react'
import {Marker,Popup, useMapEvents, useMap, Tooltip } from 'react-leaflet'
import { iconPerson } from './Icon'
const LocationMarker = (props) => {    
    // const map = useMapEvents({
    // click() {        
    //         map.locate()        
    //     },
    //     locationfound(e) {            
    //         
    //     },
    // })
    const map = useMap()
    map.on('click', function(e){
        console.log(e)
        props.onLocationChange(e.latlng)
        map.flyTo(e.latlng, map.getZoom())        
    })         
    return <input type="text" onChange={(e)=>console.log(e)}/>
    // return props.currentLocation === null ? null : (
    //     <Marker position={props.currentLocation} icon={iconPerson}>
    //          <Popup>You are here</Popup>
    //          <Tooltip>You are here</Tooltip>
    //     </Marker>
    // )  
}

export default LocationMarker