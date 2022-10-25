import { Linking } from 'react-native';
import { Center, Button, Text, NativeBaseProvider } from 'native-base';
import * as Location from 'expo-location';

export default function AskLocationPermission({ setLocationGranted }) {
  const handleEnableLocation = async () => {
    const { canAskAgain } = await Location.getForegroundPermissionsAsync();
    if (canAskAgain) {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      setLocationGranted(granted);
    } else {
      Linking.openSettings();
    }
  };

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Text fontSize={30} mb={5} color='#171717'>
          Please Enable Location
        </Text>
        <Button size='lg' colorScheme='success' onPress={handleEnableLocation}>
          Enable
        </Button>
      </Center>
    </NativeBaseProvider>
  );
}
