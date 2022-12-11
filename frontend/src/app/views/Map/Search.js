import React, {useEffect} from 'react'
import { useMap } from 'react-leaflet'
import {GeoSearchControl } from 'leaflet-geosearch';
import './search.css'
import { marker } from './Icon';




const SearchControl = (props) => {
    const map = useMap();    
    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider: props.provider,   
        showMarker: true,
        showPopup:true,
        popupFormat: ({ query, result }) => {          
          return result.label
          },            
        resultFormat: ({ result }) => result.label,            
        maxMarkers: 3,
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: true,
        searchLabel: "Search for the places",
        keepResult: false,        
        marker: {
          icon: marker,          
        },                         
      });
            
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, [props]);
  
    return null;
  };

 export default SearchControl