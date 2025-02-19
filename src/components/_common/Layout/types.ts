import React from 'react';

interface LayoutValues {
  legalDisclaimerKeys?: any[];
  footerLogoList?: any[];
  hasHeader?: boolean;
  hasHeaderNoMenu?: boolean;
  hasFooter?: boolean;
  showLenderLicense?: boolean;
  pageName?: string;
  onlyLogo?: boolean;
}
export interface LayoutProps {
  children: React.ReactNode;
  layoutValues: LayoutValues;
}
