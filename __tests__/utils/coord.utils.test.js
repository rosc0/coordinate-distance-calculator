import {
  createGeoJsonPoint,
  calculateDistanceBetweenCoords,
} from '../../utils/coord.utils';

describe('createGeoJsonPoint', () => {
  test('should create geoJSON object from latitude and longitude', () => {
    const lat = -37.228416;
    const long = 175.022163;
    const obj = createGeoJsonPoint(lat, long)

    expect(obj).toEqual(
      expect.objectContaining({
        type: expect.stringMatching('Feature'),
        geometry: expect.objectContaining({
          type: expect.stringMatching('Point'),
          coordinates: expect.arrayContaining([long, lat])
        }),
        properties: expect.objectContaining({})
      })
    )
  });
});

describe('calculateDistanceBetweenCoords', () => {
  test('should calculate the distance between 2 points', () => {
    expect(
      calculateDistanceBetweenCoords(
        { latitude: -37.228416, longitude: 175.022163 },
        { latitude: -37.226131, longitude: 175.009892 }
      )
    ).toEqual(1116);

    expect(
      calculateDistanceBetweenCoords(
        { latitude: -32.835372, longitude: 151.657946 },
        { latitude: -45.141206, longitude: 168.75885 }
      )
    ).toEqual(2006360);

    expect(
      calculateDistanceBetweenCoords(
        { latitude: -90, longitude: 0 },
        { latitude: 90, longitude: 0 }
      )
    ).toEqual(20015114);
  });

  test('should return 0 if the two points are the same', () => {
    expect(
      calculateDistanceBetweenCoords(
        { latitude: -37.228416, longitude: 175.022163 },
        { latitude: -37.228416, longitude: 175.022163 }
      )
    ).toEqual(0);
  });
});
