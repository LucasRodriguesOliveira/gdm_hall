import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Container
      colorPalette={'teal'}
      layerStyle={'fill.muted'}
      w={'full'}
      h={'100dvh'}
      p={4}
      centerContent
    >
      {children}
    </Container>
  );
}
