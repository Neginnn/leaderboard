import { extendTheme } from '@chakra-ui/react';
import { Modal } from './chakraComponents/Modal';
import { Toast } from './chakraComponents/Toast';
import { Tooltip } from './chakraComponents/Tooltip';

// Chakra-UI Modal https://chakra-ui.com/docs/components/overlay/modal
// Modal styling
export const theme = extendTheme({
  breakpoints: {
    sm: '641',
    md: '1024',
    lg: '1440'
  },
  components: {
    Modal,
    Tooltip,
    Toast
  }
});
