import {campMarker} from './Icon'

export const drawOptions = {
    polygon: {
        showArea: true,
        allowIntersection: false, 
        drawError: {
          color: '#e1e100',
          message: '<strong>Not possible'
        },
        shapeOptions: {
          stroke: true,
          color: '#34eb9e',
          weight: 4,
          opacity: 0.5,
          fill: true,
          clickable: true
        },
      },
    rectangle: false,
    circle: false,
    marker: {
      icon: campMarker
    },
    polyline: false,
    point: false
                          
}

