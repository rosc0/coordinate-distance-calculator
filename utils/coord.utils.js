import distance from '@turf/distance';

const createGeoJsonPoint = (longitude, latitude) => {
  return {
    type: 'Feature',
    geometry: { 
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    properties: {}
  };
}

export const calculateDistanceBetweenCoords = (formCoords, currentCoords) => {
  const from = createGeoJsonPoint(currentCoords.longitude, currentCoords.latitude);
  const to = createGeoJsonPoint(formCoords.longitude, formCoords.latitude);
  const options = { units: 'kilometers' };

  const turfDistance = distance(from, to, options);
  
  return Math.round(turfDistance * 1000);
};