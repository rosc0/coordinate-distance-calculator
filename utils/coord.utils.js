import distance from '@turf/distance';

// Create geoJSON point for Turf
export const createGeoJsonPoint = (longitude, latitude) => {
  return {
    type: 'Feature',
    geometry: { 
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    properties: {}
  };
}

// Calculate distance from 2 lat/long
export const calculateDistanceBetweenCoords = (formCoords, currentCoords) => {
  const from = createGeoJsonPoint(currentCoords.longitude, currentCoords.latitude);
  const to = createGeoJsonPoint(formCoords.longitude, formCoords.latitude);
  const options = { units: 'kilometers' };

  const turfDistance = distance(from, to, options);
  
  return Math.round(turfDistance * 1000);
};