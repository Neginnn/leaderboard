import styled from '@emotion/styled';
import { colours } from '@/styles/colours';
import { mediaQueries } from '@/styles/mediaQueries';

const { mobileOnly, mediumUp, largeUp } = mediaQueries.device;
const { black, separatorColor } = colours;

export const LayoutStyle = styled.div`
  .loan-page {
    footer {
      @media ${mobileOnly} {
        padding-bottom: 145px;
        background-color: ${black};
      }
    }
  }
  .home-page {
    background-color: ${black};
    min-height: 100vh;
  }
  .layout-footer-nav {
    padding-top: 0;
    padding-bottom: 0;
  }
`;
