import React, { useEffect } from 'react';
import { LayoutStyle } from './style';
import { LayoutProps } from './types';

// note: https://nextjs.org/docs/basic-features/layouts
export function Layout({ children, layoutValues }: LayoutProps) {
  return (
    <LayoutStyle>
      <div className={`main-wrap  `}>
        <main>{children}</main>
      </div>
    </LayoutStyle>
  );
}
