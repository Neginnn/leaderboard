import type { ComponentStyleConfig } from '@chakra-ui/theme';

// note: none of this has any effect:
export const Toast: ComponentStyleConfig = {
  baseStyle: (props: any) => ({
    position: 'top',
    height: '1200px',
    width: '100%',
    background: 'blue !important',
    fontSize: '66px !important',
    'chakra-alert': {
      fontSize: '99px !important'
    },
    containerStyle: {
      width: '100%',
      maxWidth: '100%',
      margin: 0,
      height: '400px',
      maxHeight: '400px',
      background: 'red !important',
      fontSize: '99px !important'
    }
  }),
  defaultProps: {
    status: 'warning',
    position: 'top',
    duration: 90_000,
    isClosable: true
  }
};
