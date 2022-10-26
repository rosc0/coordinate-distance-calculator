import { render } from '@testing-library/react-native';
import { Container, NativeBaseProvider } from 'native-base';

const Providers = ({ children }) => {
  const inset = {
    frame: { width: 320, height: 640, x: 0, y: 0 },
    insets: { left: 0, right: 0, bottom: 0, top: 0 },
  };
  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <Container>
        {children}
      </Container>    
    </NativeBaseProvider>
  );
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: Providers, ...options });
};

export * from '@testing-library/react-native';

export { customRender as render };
