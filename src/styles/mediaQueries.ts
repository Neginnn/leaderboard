export const maxSmallMobileSize = 365;
export const maxMobileSize = 640;
export const maxTabletSize = 1023;
export const maxLaptopSize = 1439;
export const maxDesktopSize = 999999999999;

export const mediaQueries = {
  device: {
    smallMobileOnly: `only screen and (max-width: ${maxSmallMobileSize}px)`,
    mobileOnly: `only screen and (max-width: ${maxMobileSize}px)`,
    mediumUp: `only screen and (min-width: ${maxMobileSize + 1}px)`,
    mediumOnly: `only screen and (min-width: ${
      maxMobileSize + 1
    }px) and (max-width: ${maxTabletSize}px)`,
    smallMediumOnly: `only screen and (max-width: ${maxTabletSize}px)`,
    largeUp: `only screen and (min-width: ${maxTabletSize + 1}px)`,
    largeOnly: `only screen and (min-width: ${
      maxTabletSize + 1
    }px) and (max-width: ${maxLaptopSize}px)`,
    mediumLargeOnly: `only screen and (min-width: ${
      maxMobileSize + 1
    }px) and (max-width: ${maxLaptopSize}px)`,
    xlargeUp: `only screen and (min-width: ${maxLaptopSize + 1}px)`,
    xlargeOnly: `only screen and (min-width: ${
      maxLaptopSize + 1
    }px) and (max-width: ${maxDesktopSize}px)`
  }
};
