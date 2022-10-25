import { FormControl, Stack, Input, NativeBaseProvider } from 'native-base';

export default function FormInput({ name, label = name, onChangeText }) {
  return (
    <NativeBaseProvider>
      <Stack>
        <FormControl.Label _text={{ textTransform: 'capitalize', color: '#171717' }}>
          {label}
        </FormControl.Label>
        <Input
          size='2xl'
          p={3}
          backgroundColor='#ffffff'
          borderColor='#c2c2c2'
          keyboardType='numeric'
          onChangeText={onChangeText}
        />
      </Stack>
    </NativeBaseProvider>
  );
}
