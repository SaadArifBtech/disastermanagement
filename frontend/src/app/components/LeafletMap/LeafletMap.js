import React, {useEffect} from 'react'
import './style.css'
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Shapefile from './ShapeFile';
import { Link } from 'react-router-dom'

import Auxilary from 'app/hoc/Auxilary';
import Button from 'app/components/Button/Button';
import icon from '../../../assets/blue-marker.png'
import { campMarker } from 'app/views/Map/Icon';

const mapStyle = {
    height: "600px",     
    backgroundColor: "red",    
    marginBottom:"90px",
    padding: "16px"
  };



let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: new L.Point(40, 40),        
});





L.Marker.prototype.options.icon = DefaultIcon;


const LeafletMap = (props) => {
    const [defaultPosition, setDefaultPosition] = React.useState({lat: 30.3753, lng: 69.3451})    
    // const [markers, setMarkers] = React.useState(null)    
    // console.log(props.markers && props.markers.map(marker=>{
    //   console.log(marker)
    // }))
    // useEffect(()=>{
    //   setMarkers(props.markers)
    // },[])
    return (    
        <Auxilary>    
          <MapContainer  
              center={props.position ? props.position : defaultPosition} 
              zoom={6} 
              scrollWheelZoom={true} 
              style={mapStyle}                   
              >                    
            <TileLayer
                attrbution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"         
                />
                <Marker position={props.position ? props.position : defaultPosition}>   
                  <Popup>{props.locationName ? props.locationName : "Pakistan"}</Popup>               
                </Marker>
                {props.markers && props.markers.map(marker =>(
                  <Marker key={marker.id} position={marker.coordinates} icon={campMarker}>   
                      <Popup>
                        <p><b>Refugee Camp Name:</b> {marker.name}</p>
                        <p><b>City:</b> {marker.city}</p>
                        <p><b>Province:</b> {marker.province}</p>
                        <p><b>Total Tents:</b> {marker.total_tents}</p>
                        <p><b>Registered Effecties:</b> {marker.registerations}</p>
                        <Link to={'/emergency-camps/'+marker.id} onClick={(e)=> e.stopPropagation()}>View Details</Link>
                      </Popup>               
                  </Marker>
                ))}            
                    <Shapefile shape={props.shape} floods={props.floods ? props.floods: null} color={props.color ? props.color: null} fillColor={props.fillColor ? props.fillColor: null} />
          </MapContainer>         
        </Auxilary>
      )
}

export default LeafletMap
