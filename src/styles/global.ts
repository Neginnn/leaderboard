import { css } from "@emotion/react";
import { colours } from "./colours";
import { fontFamily, fonts, fontWeight } from "./fonts";
import { mediaQueries } from "./mediaQueries";

const { proxima, led } = fontFamily;
const { background, black, button, red, white, redRibbon } = colours;
const { bold } = fontWeight;
const { smallMediumOnly, mediumOnly, mobileOnly, mediumUp, largeUp } =
  mediaQueries.device;

const globalStyles = css`
  ${fonts}

  html {
    font-size: 10px;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${background};
    font-family: ${proxima};
    font-size: 1.6rem;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  p {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    @media ${mediumUp} {
      font-size: 18px;
      line-height: 28px;
      margin-bottom: 30px;
    }
  }
  :not(svg) {
    transform-origin: 0px 0px;
  }
  svg {
    fill: currentColor;
    box-sizing: content-box;
    &:not(:root) {
      overflow: hidden;
    }
  }
  sup {
    font-size: 12px;
    vertical-align: middle;
    font-weight: normal;
  }
  li {
    list-style: none;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .hide {
    display: none !important;
    visibility: hidden;
  }
  .link {
    color: ${black};
    text-decoration: underline;
    cursor: pointer;
  }

  .container {
    position: relative;
    max-width: 1250px;
    margin: 0 auto;
  }
  .section {
    padding-top: 35px;
    padding-right: 5%;
    padding-bottom: 35px;
    padding-left: 5%;
    font-size: 18px;
    line-height: 1.5;
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
  }
  .inner {
    max-width: 1250px;
    margin-right: auto;
    margin-left: auto;
  }
  .mobile-only {
    display: none;
    @media ${mobileOnly} {
      display: block;
    }
  }
  .tablet-only {
    display: none;
    @media ${mediumOnly} {
      display: block;
    }
  }
  .mobile-tablet-only {
    display: block;
    @media ${largeUp} {
      display: none;
    }
  }
  .desktop-only {
    display: block;
    @media ${smallMediumOnly} {
      display: none;
    }
  }
  .tablet-plus {
    display: none;
    @media ${mediumUp} {
      display: block;
    }
  }
  .led-title {
    font-family: ${led};
    font-size: 36px;
    line-height: 43px;
    margin-bottom: 41px;
    text-transform: uppercase;
    display: block;
    @media ${mediumUp} {
      font-size: 70px;
      line-height: 84px;
      margin-bottom: 62px;
    }
    @media ${largeUp} {
      font-size: 80px;
      line-height: 96px;
      margin-bottom: 154px;
      max-width: 900px;
    }
  }
  .button {
    border: 1px solid ${black};
    border-radius: 25%;
    font-weight: ${bold};
    padding: 14px 20px;
    display: inline-block;
    border-radius: 360px;
    font-size: 16px;
    text-align: center;
  }
  .red-button {
    background-color: ${red};
    color: ${white};
    -webkit-appearance: none;
    border-radius: 0;
    font-weight: ${bold};
    display: inline-block;
    border: none;
    padding: 15px 20px 13px;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.2s ease 0s;
    max-width: 400px;
    width: 100%;
    &--less-side-padding {
      padding-left: 15px;
      padding-right: 15px;
    }

    &:focus {
      outline: 5px solid rgba(59, 153, 252, 0.4);
    }
    &.cta {
      font-size: 14px;
      line-height: 16px;
      padding-top: 16px;
      padding-bottom: 14px;
      vertical-align: top;
    }
    //buttons with a loader should not have hover state
    &:not(.button-loading):not(.disabled):hover {
      background-color: ${redRibbon};
    }

    &.disabled,
    &[disabled="disabled"],
    &[disabled="true"] {
      background-color: rgba(226, 4, 41, 0.2);
      color: rgba(255, 255, 255, 0.5);
      opacity: 1;
      cursor: default;
      pointer-events: none;
    }
  }
  .main-wrap {
    transition: all 0.3s;
  }

  /* add padding if there's header */
  .hasHeader {
    main {
      padding-top: 50px;

      @media ${mediumUp} {
        padding-top: 80px;
      }
    }
  }

  /* Navigation */
  .nav-tray-open {
    overflow: hidden;
    @media ${largeUp} {
      overflow: auto;
    }
    .main-wrap {
      main,
      footer,
      .nav {
        transform: translate3d(-260px, 0, 0);
        transition: all 0.3s;
        @media ${largeUp} {
          transform: translate3d(0px, 0, 0);
        }
      }
    }
    .nav-mobile-tray {
      transform: translate3d(0, 0, 0) !important;
      visibility: visible;
      @media ${largeUp} {
        display: none !important;
      }
    }
  }

  /* Top Banner */
  /* note: Temporary styling will be moved of global  */
  .chakra-alert {
    border-radius: 0px !important;
    height: 57px;
    @media ${mediumUp} {
      height: 47px;
    }
    .chakra-alert__icon {
      padding: 3px 5px;
    }
    .chakra-alert__title {
      padding: 3px 5px;
    }
    .chakra-alert__desc {
      padding: 3px 5px;
    }
    button {
      padding: 3px 5px;
    }
  }
  .large-title {
    font-size: 34px;
    line-height: 42px;
    font-weight: ${bold};
    display: block;
    margin-bottom: 20px;
    @media ${largeUp} {
      font-size: 42px;
      line-height: 51px;
      margin-bottom: 40px;
    }
  }
  .medium-title {
    font-size: 26px;
    line-height: 32px;
    font-weight: ${bold};
    display: block;
    margin-bottom: 20px;
    @media ${mediumUp} {
      font-size: 34px;
      line-height: 42px;
    }
  }
`;

export default globalStyles;
