import { useState } from 'react';
import { Alert } from 'react-native';
import { FormControl, Stack, Button, View } from 'native-base';
import * as Location from 'expo-location';

import { calculateDistanceBetweenCoords } from '../utils/coord.utils'

import FormInput from '../components/FormInput';

const initialFormState = {
  latitude: null,
  longitude: null,
};
const initialErrorState = {
  latitude: null,
  longitude: null,
  generalError: null,
};
const formFields = ['latitude', 'longitude'];

export default function CoordDistanceForm() {
  const [calculating, setCalculating] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialErrorState);

  const handleTextChange = (text, field) => {
    setFormData({
      ...formData,
      [field]: text,
    });
  };

  const validateFormCoords = () => {
    let hasError = false;
    formFields.forEach((field) => {
      if (formData[field] === null || isNaN(formData[field])) {
        setFormErrors((currentErrors) => ({
          ...currentErrors,
          [field]: 'Please enter a number',
        }));
        hasError = true;
      }
    });

    return hasError ? false : formData;
  };

  const getCurrentCoords = async () => {
    const { coords } = await Location.getCurrentPositionAsync();

    if (coords.latitude && coords.longitude) {
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };
    } else {
      setFormErrors((formErrors) => ({
        ...formErrors,
        generalError:
          'Whoops! Something went wrong getting your current location',
      }));
      return false;
    }
  };

  const handleSubmitForm = async () => {
    setCalculating(true);

    setFormErrors(initialErrorState);

    const formCoords = validateFormCoords();

    const currentCoords = await getCurrentCoords();

    if (formCoords && currentCoords) {
      const distance = calculateDistanceBetweenCoords(
        formCoords,
        currentCoords
      );

      if (typeof distance === 'number' && !Number.isNaN(distance)) {
        Alert.alert('Distance Between Coordinates', `${distance}m`, [
          { text: 'OK' },
        ]);
      } else {
        setFormErrors((formErrors) => ({
          ...formErrors,
          generalError: 'Whoops! Something went wrong calculating the distance',
        }));
      }
    }

    setCalculating(false);
  };

  return (
    <View width='90%'>
      <Stack>
        {formFields.map((field, index) => (
          <FormControl
            key={`form-input-${index}`}
            isRequired
            isInvalid={formErrors[field] !== null}
          >
            <FormInput              
              name={field}
              onChangeText={(text) => handleTextChange(text, field)}
            />
            <View h={8}>
              <FormControl.ErrorMessage>
                {formErrors[field]}
              </FormControl.ErrorMessage>
            </View>
          </FormControl>
        ))}

        <Button
          size='lg'
          colorScheme='success'
          variant='solid'
          mt={3}
          isLoading={calculating}
          isLoadingText='Calculating'
          onPress={handleSubmitForm}
        >
          Submit
        </Button>

        <View h={8}>
          <FormControl>
            <FormControl.ErrorMessage isInvalid={formErrors.generalError !== null}>
              {formErrors.generalError}
            </FormControl.ErrorMessage>
          </FormControl>
        </View>
      </Stack>
    </View>
  );
}
