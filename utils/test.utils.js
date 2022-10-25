import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

const Providers = ({ children }) => {
  return <NativeBaseProvider>{children}</NativeBaseProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react-native';

export { customRender as render };
