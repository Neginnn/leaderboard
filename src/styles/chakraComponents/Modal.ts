import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const Modal: ComponentStyleConfig = {
  baseStyle: (props: any) => ({
    dialog: {
      color: 'white',
      bg: 'transparent',
      boxShadow: 'none',
      transition: ' all 0.325s',
      transformStyle: 'flat',
      perspective: '800px',
      width: '80%',
      button: {
        '--close-button-size': '30px',
        '&:focus': {
          outline: '0px',
          border: 'none',
          outlineOffset: '0px',
          boxShadow: 'none'
        }
      },
      '&[style*="opacity: 1; transform: none;"]': {
        '.dialog-wrap': {
          transition: ' all 0.325s',
          WebkitTransform: 'scale(1) rotateX(0deg) translateY(0px)',
          MsTransform: 'scale(1) rotateX(0deg) translateY(0px)',
          opacity: '1',
          visibility: 'visible'
        }
      },
      '.dialog-wrap': {
        margin: 'auto',
        transition: ' all 0.325s',
        WebkitTransform: 'scale(0.2) rotateX(-90deg) translateY(400px)',
        MsTransform: 'scale(0.2) rotateX(-90deg) translateY(400px)',
        minHeight: '90vh',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        padding: '15px 10px',
        opacity: '0.2',
        visibility: 'hidden'
      },
      '.dialog': {
        display: 'flex',
        alignItems: 'center',
        overflow: 'auto',
        minHeight: '90vh'
      }
    },
    overlay: {
      bg: 'rgba(0,0,0,.9)',
      transformStyle: 'flat',
      perspective: '800px'
    }
  })
};
