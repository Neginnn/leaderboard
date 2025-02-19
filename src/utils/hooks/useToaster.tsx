import { useToast } from '@chakra-ui/react';

// Extending useToast w added default behavior
export function useToaster() {
  const toast = useToast();

  const defaultToastId = 'default_toast_message';

  const toastMessageDefaults = {
    id: defaultToastId,
    title: 'Something went wrong',
    description: 'Uh oh! Something went wonky—try again.',
    status: 'default',
    duration: 90000,
    position: 'bottom',
    isClosable: true,
    containerStyle: {
      width: '100%',
      maxWidth: '100%',
      margin: 0,
      height: '200px',
      maxHeight: '200px'
    }
  };

  return {
    warningToast: (options: any) => {
      const customizations = {
        status: 'warning',
        position: 'top',
        title: '',
        containerStyle: {
          width: '50%',
          maxWidth: '50%'
        }
      };

      const warningMessageDefaults = { ...toastMessageDefaults, ...customizations };

      if (!toast.isActive(defaultToastId)) {
        toast({
          ...warningMessageDefaults,
          ...options
        });
      }

      return toast;
    },
    successToast: (options: any) => {
      const customizations = {
        status: 'success',
        title: 'Success!',
        description: 'Great, that worked.'
      };

      const successMessageDefaults = { ...toastMessageDefaults, ...customizations };

      if (!toast.isActive(defaultToastId)) {
        toast({
          ...successMessageDefaults,
          ...options
        });
      }

      return toast;
    }
  };
}
