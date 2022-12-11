import L from 'leaflet';
import default_marker from '../../../assets/marker.png'
import camp_marker from '../../../assets/camp-marker-2.png'
const marker = new L.Icon({
    iconUrl: default_marker,
    iconRetinaUrl:  default_marker,      
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(50, 50),    
});

const campMarker = new L.Icon({
    iconUrl: camp_marker,
    iconRetinaUrl: camp_marker,      
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(70, 70),  
    className: "blinking"  
});

export { marker, campMarker };