import { css } from '@emotion/react';
import { colours } from '@/styles/colours';
import { fontWeight } from '@/styles/fonts';
import { mediaQueries } from '@/styles/mediaQueries';

const { largeUp, mediumOnly, mobileOnly, mediumUp } = mediaQueries.device;
const { medium } = fontWeight;
const { black, white } = colours;

export const maxWidth = (maxWidth?: string) => css`
  max-width: ${maxWidth || '1250px'};
  margin-right: auto;
  margin-left: auto;
`;

export const stamped = (bgColor?: string) => css`
  background: ${bgColor || 'black'};
  border-radius: 3px;
  color: #f9f9f9;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 1.5px;
  padding: 0 3px;
  height: 18px;
  line-height: 20px;
`;

export const sectionPaddings = css`
  padding-top: 35px;
  padding-right: 5%;
  padding-bottom: 35px;
  padding-left: 5%;
  box-sizing: border-box;

  @media ${mobileOnly} {
    padding-right: 20px;
    padding-left: 20px;
  }

  @media ${mediumOnly} {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  @media ${largeUp} {
    padding-top: 120px;
    padding-bottom: 120px;
  }
`;

export const btn = css`
  display: block;
  width: auto;
  font-weight: ${medium};
  font-size: 16px;
  line-height: 20px;
  padding: 15px 0;
  border: 1px solid ${black};
  border-radius: 50px;
  text-align: center;
  margin-top: 30px;
  transition: all 0.2s ease 0s;

  @media ${mediumUp} {
    padding: 15px 20px;
  }

  &:hover {
    color: ${white};
    background-color: ${black};
  }
`;
