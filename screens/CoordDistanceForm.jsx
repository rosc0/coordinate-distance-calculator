import { useState } from 'react';
import { Alert } from 'react-native';
import { FormControl, Stack, Button, View } from 'native-base';
import * as Location from 'expo-location';
import getDistance from 'geolib/es/getDistance';

import FormInput from '../components/FormInput';

const initialFormState = {
  latitude: null,
  longitude: null,
}

const initialErrorState = {
  latitude: null,
  longitude: null,
  generalError: null,
}

export default function CoordDistanceForm() {
  const [calculating, setCalculating] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialErrorState);

  const formFields = ['latitude', 'longitude'];

  const handleTextChange = (text, field) => {
    setFormData({
      ...formData,
      [field]: text,
    });
  }

  const validateFormCoords = () => {
    let hasError = false
    formFields.forEach((field) => {
      if (formData[field] === '' || isNaN(formData[field])) {
        setFormErrors((currentErrors) => ({
          ...currentErrors,
          [field]: 'Please enter a number',
        }));
        hasError = true
      }
    });

    return hasError ? false : formData;
  };

  const validateCurrentCoords = async () => {
    const { coords } = await Location.getCurrentPositionAsync();

    if (coords.latitude && coords.longitude) {
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };
    } else {
      setFormErrors((formErrors) => ({
        ...formErrors,
        generalError: 'Whoops! Something went wrong getting your current location',
      }));
      return false;
    }
  };

  const calculateDistanceBetweenCoords = (formCoords, currentCoords) => {
    const distance = getDistance(formCoords, currentCoords);
    return distance;
  };

  const clearErrors = () => {
    setFormErrors(initialErrorState);
  };

  const handleSubmitForm = async () => {
    setCalculating(true)
    clearErrors();

    const formCoords = validateFormCoords();

    const currentCoords = await validateCurrentCoords();

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

    setCalculating(false)
  };

  return (
    <View isRequired width='90%'>
      <Stack>
        {formFields.map((field, index) => (
          <FormControl key={index} isRequired isInvalid={formErrors[field] !== null}>
            <FormInput
              key={`form-input-${index}`}
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
          isLoadingText="Calculating"
          onPress={handleSubmitForm}
        >
          Submit
        </Button>

        <View h={8}>
          <FormControl>
            <FormControl.ErrorMessage
              isInvalid={'generalError' in formErrors}
            >
              {formErrors.generalError}
            </FormControl.ErrorMessage>
          </FormControl>
        </View>
      </Stack>
    </View>
  );
}