import React from 'react'
import { MapContainer, TileLayer, Marker, FeatureGroup, LayersControl, useMapEvents } from 'react-leaflet'
import { LocationIQProvider, OpenStreetMapProvider } from 'leaflet-geosearch';
import { computeArea ,LatLng} from 'spherical-geometry-js/src/index';
import Modal from 'app/components/modals/ModalCustom'
import { EditControl } from 'react-leaflet-draw'
import {marker} from './Icon'
import SearchControl from './Search';
import Auxilary from 'app/hoc/Auxilary';
import { drawOptions } from './options';
import LocationMarker from './LocationMarker';
import * as turf from '@turf/turf'
import Button from 'app/components/Button/Button';
import axios from 'axios'
import Form from './Form';
import L from "leaflet";
import Router from './Router';
const mapStyle = {
    height: "600px",     
    backgroundColor: "red",    
    marginBottom:"90px",
    padding: "16px"
  };


const Map = () => {

  const prov = new LocationIQProvider({
    params: {
      key: 'pk.56b24c30545e1e1035695c8f0ede356d'
    }
  })


  const [areaModal, setAreaModal] = React.useState(false)
  const [area, setArea] = React.useState(0)
  const [city, setCity] = React.useState('')
  const [name, setName] = React.useState('')
  const [province, setProvince] = React.useState('')
  const [localAddress, setLocalAddress] = React.useState('')
  const [mainAddress, setMainAddress] = React.useState('')
  const [beds, setBeds] = React.useState('')
  const [coordinates, setCoordinates] = React.useState('')
  const [tentSize, setTentSize] = React.useState('')  
  const [position, setPosition] = React.useState({lat: 33.738045, lng: 73.084488})
  const [polygons, setPolygons] = React.useState(0)
  const [markers, setMarkers] = React.useState(0)
  const [wayPoints, setWayPoints] = React.useState(null)
  
  const _created = (e) =>{    
    const layer = e.layer;
    const type = e.layerType
    const initialWayPoints = []
    if(type=="polygon"){
      setPolygons(polygons+1)    
      const coordinates = e.layer._latlngs[0].map((key)=>({
        lat: key.lat,
        lng: key.lng      
      }))

      const center = layer.getBounds().getCenter();
      setCoordinates(center)

      const coordinatesForArea = e.layer._latlngs[0].map((key)=>([ key.lat, key.lng]))
      console.log(coordinatesForArea)
      axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.56b24c30545e1e1035695c8f0ede356d&lat=${coordinates[0].lat}&lon=${coordinates[0].lng}&format=json`)
      .then(res=>{
        console.log(res.data)
        setCity(res.data.address.city)
        setLocalAddress(res.data.display_name)        
        setProvince(res.data.address.state)        
        setMainAddress(res.data.display_name)                
      })
      .catch(err=>console.log(err))
      console.log(coordinates)
      initialWayPoints.push(coordinates[0].lat)
      initialWayPoints.push(coordinates[0].lng)
      setWayPoints(initialWayPoints)

      const latLngs = coordinates.map(coor => (
        new LatLng(coor.lng, coor.lat)
      ))
        
      const caluclatedArea = computeArea(latLngs)
      
      setArea(caluclatedArea.toFixed(2))  
      layer.bindPopup(`Area: ${caluclatedArea} m² `)      
    }
    if(type === "marker"){
      setMarkers(markers+1)      
      console.log(layer)
      initialWayPoints.push(layer._latlng.lat)
      initialWayPoints.push(layer._latlng.lng)
      setWayPoints(initialWayPoints)

      layer.bindPopup(`${mainAddress} Rescue Camp`)

    }
  } 

 

  const _deleted = (e) => {
    setPolygons(polygons-1)
    setMarkers(markers-1)
    setWayPoints(null)   
    console.log(e)
  }
    
  
  const modalToggler = () => {
    setAreaModal(!areaModal)
  }

  return (
    
    <Auxilary>    
      <MapContainer  
          center={position} 
          zoom={9} 
          scrollWheelZoom={true} 
          style={mapStyle}                   
          >                    
              <TileLayer                
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                subdomains={['mt1','mt2','mt3']}
                />            
              <div className="leaflet-bottom leaflet-center" style={{
                display: polygons > 0 ? "block" : "none"
              }}>
                <div className="leaflet-control leaflet-bar" style={{backgroundColor: "#fff"}}>               
                  <Button color="success" variant="outlined" click={modalToggler}>Add This Area</Button>              
                </div>
              </div>
              
              <Marker position={position} icon={marker}></Marker>             
              <FeatureGroup>
                  <EditControl
                      position='topright'                    
                      onCreated={_created} 
                      onDeleted={_deleted}
                      draw={{
                        ...drawOptions,
                        marker: markers > 0 ?  false : {...drawOptions.marker},
                        polygon: polygons > 0 ? false : {...drawOptions.polygon}
                      }}                   
                  ></EditControl>                    
              </FeatureGroup>        
              {wayPoints && <Router waypoints={wayPoints} />}
          <SearchControl              
              provider={prov}            
              />          
      </MapContainer>
      <Modal  handleModalClose={()=> setAreaModal(false)} open={areaModal}>          
          <Form 
            area={area}
            address={mainAddress}
            local_address={localAddress}
            city={city}
            province={province}
            coordinates = {coordinates}
          />
      </Modal>
    </Auxilary>
  )
}

export default Map