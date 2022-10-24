import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Center, NativeBaseProvider } from 'native-base';
import * as Location from 'expo-location';

import AskLocationPermission from './screens/AskLocationPermission';
import CoordDistanceForm from './screens/CoordDistanceForm';

export default function App() {
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    const checkLocationPermission = async () => {
      const { granted } = await Location.getForegroundPermissionsAsync();
      setLocationGranted(granted);
    };
    checkLocationPermission();
  }, []);

  // https://docs.nativebase.io/testing
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <Center flex={1} backgroundColor='#e0e0e0'>
        {locationGranted ? (
          <CoordDistanceForm />
        ) : (
          <AskLocationPermission setLocationGranted={setLocationGranted} />
        )}
      </Center>
      <StatusBar style='auto' />
    </NativeBaseProvider>
  );
}
