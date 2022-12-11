import React, {useEffect} from 'react'
import L from 'leaflet';
import { useMap } from 'react-leaflet'
import "leaflet-routing-machine"
import 'leaflet-routing-machine-locationiq'; 

const Router = (props) => {    
    const map = useMap()    
    useEffect(()=>{
        const routingControl = L.Routing.control({        
          waypoints:[
            L.latLng(33.738045, 73.084488),
            L.latLng(props.waypoints[0], props.waypoints[1])
          ],
          reverseWaypoints: true,
          showAlternatives: true,
          createMarker: function(i, wp, nWps) {            
            if (i === 0 || i === nWps - 1) {
                return null
            } 
         },   
          lineOptions: {
            styles: [
                {color: 'green', opacity: 0.15, weight: 9}, {color: 'red', opacity: 0.8, weight: 6}, {color: 'yellow', opacity: 1, weight: 2}
            ]            
        },
          addWaypoints: false          
        })        
        .addTo(map)
        return () => {
            map.removeControl(routingControl)
        }
        // map.addControl(routingControl);
    },[props])
  return null
}

export default Router