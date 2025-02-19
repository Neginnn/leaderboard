import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const Tooltip: ComponentStyleConfig = {
  baseStyle: (props: any) => ({
    background: props.background ? props.background : '#ff7500',
    color: 'white',
    padding: '10px 12px',
    fontSize: '15px',
    lineHeight: '18px',
    '.chakra-tooltip__arrow': {
      background: props.background ? `${props.background} !important` : '#ff7500 !important',
      top: '-2px !important'
    }
  })
};
