import React, {useEffect} from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";

function Shapefile(props) {
  const map = useMap();
  useEffect(() => {
    const geo = L.geoJson(
      { features: [] },
      {
        style : { color: "#324e9c", fillColor: "#324e9c", fillColorOpacity: 0.4, weight: 2 },
        onEachFeature: function popUp(f, l) {   
            // var out = [];
            // if (f.properties) {
            //   for (var key in f.properties) {
            //     out.push(key + ": " + f.properties[key]);
            //   }
            //   l.bindPopup(out.join("<br />"));
            // }      
        }
      }
    ).addTo(map);

    const boundry = L.geoJson({
        features: []
    },
    {
        style : { color: props.color || "red", fillColor: props.fillColor || "yellow", fillColorOpacity: 0.4, weight: 2 },
        onEachFeature: function popUp(f,l){
            var out = [];
            if (f.properties) {
              for (var key in f.properties) {
                out.push(key + ": " + f.properties[key]);
              }
              l.bindPopup(out.join("<br />"));
            }      
        }
    }
    ).addTo(map)

    boundry.addData(props.shape) 
    if(props.floods){
        geo.addData(props.floods) 
    }
  }, []);

  return null;
}

export default Shapefile