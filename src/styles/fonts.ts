export const fontFamily = {
  led: 'LED, Helvetica, Arial, sans-serif',
  proxima: 'ProximaNova, Helvetica, Arial, sans-serif',
  tuskerGrotesk: 'TuskerGrotesk, Helvetica, Arial, sans-serif',
  firaMono: 'FiraMono, Helvetica, Arial, sans-serif',
  inter: 'Inter,  sans-serif'
};

export const fontWeight = {
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800
};

const { normal, medium, semiBold, bold, extraBold } = fontWeight;
const staticPath = process.env.STATIC_REPO_FILES_PATH;
const assetsPath = '/web-assets';

export const fonts = `
  @font-face {
    font-family: 'Inter';
    src: url('${assetsPath}/fonts/Inter-BoldItalic.woff2') format('woff2'), url('${assetsPath}/fonts/Inter-BoldItalic.woff') format('woff');
    font-weight: ${normal};
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url('${assetsPath}/fonts/inter-Regular.woff2') format('woff2'), url('${assetsPath}/fonts/inter-Regular.woff') format('woff');
    font-weight: ${normal};
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'FiraMono';
    src: url('${assetsPath}/fonts/fira-mono-regular.woff2') format('woff2'), url('${assetsPath}/fonts/fira-mono-regular.woff') format('woff');
    font-weight: ${normal};
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'LED';
    src: url('${assetsPath}/fonts/led.woff2') format('woff2'), url('${assetsPath}/fonts/led.woff') format('woff');
    font-weight: ${normal};
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'ProximaNova';
    src: url('${assetsPath}/fonts/proximaNova-regular-webfont.woff2') format('woff2'),
      url('${assetsPath}/fonts/proximaNova-regular-webfont.woff') format('woff');
    font-weight: ${normal};
    font-style: normal;
    font-display: swap;
  }

  @font-face {
  font-family: 'ProximaNova';
  src: url('${assetsPath}/fonts/proximaNova-medium.woff2') format('woff2'),
    url('${assetsPath}/fonts/proximaNova-medium.woff') format('woff');
  font-weight: ${medium};
  font-style: normal;
  font-display: swap;
}


  @font-face {
    font-family: 'ProximaNova';
    src: url('${assetsPath}/fonts/proximaNova-semibold-webfont.woff2') format('woff2'),
      url('${assetsPath}/fonts/proximaNova-semibold-webfont.woff') format('woff');
    font-weight: ${semiBold};
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'ProximaNova';
    src: url('${assetsPath}/fonts/proximaNova-bold-webfont.woff2') format('woff2'),
      url('${assetsPath}/fonts/proximaNova-bold-webfont.woff') format('woff');
    font-weight: ${bold};
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'ProximaNova';
    src: url('${assetsPath}/fonts/proximaNova-extra-bold-webfont.woff2') format('woff2'),
      url('${assetsPath}/fonts/proximaNova-extra-bold-webfont.woff') format('woff');
    font-weight: ${extraBold};
    font-style: normal;
    font-display: swap;
  }



  @font-face {
    font-family: 'TuskerGrotesk';
    src: url('${assetsPath}/fonts/TuskerGrotesk-webfont.woff2') format('woff2'),
    url('${assetsPath}/fonts/TuskerGrotesk-webfont.woff') format('woff');
    font-weight: ${normal};
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'TuskerGrotesk';
    src: url('${assetsPath}/fonts/TuskerGrotesk6600-webfont.woff2') format('woff2'),
    url('${assetsPath}/fonts/TuskerGrotesk6600-webfont.woff') format('woff');
    font-weight: ${semiBold};
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'TuskerGrotesk';
    src: url('${assetsPath}/fonts/TuskerGrotesk6800-webfont.woff2') format('woff2'),
    url('${assetsPath}/fonts/TuskerGrotesk6800-webfont.woff') format('woff');
    font-weight: ${bold};
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'TuskerGrotesk';
    src: url('${assetsPath}/fonts/TuskerGrotesk8800-webfont.woff2') format('woff2'),
    url('${assetsPath}/fonts/TuskerGrotesk8800-webfont.woff') format('woff');
    font-weight: ${extraBold};
    font-style: normal;
    font-display: swap;
  }

`;
