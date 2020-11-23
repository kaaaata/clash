import { css } from '@emotion/core'; /** @jsx jsx */
import { colors, zIndex, effects } from './styles';

export const topNavCss = css`
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0 20px;
  width: 100%;
  box-shadow: 2px 2px 4px ${colors.black};
  position: absolute;
  top: 0;

  .left, .right {
    width: 385px;
  }

  .left {
    .top_nav_portrait {
      margin-right: 25px;
      flex: 0 0 auto;
    }

    .attributes {
      margin-right: 40px;
      font-size: 24px;
      flex: 0 0 auto;
    }

    .lives {
      flex: 0 0 auto;
      margin-right: 40px;

      & > * {
        margin-right: 3px;
      }
    }
  }

  .right {
    z-index: ${zIndex.mouseEventArea5};

    .collection {
      flex: 0 0 auto;
      width: 100px;

      .deck_count {
        margin-left: 5px;
      }
    }

    .gold {
      justify-content: flex-start;
      flex: 0 0 auto;
      width: 110px;
      margin-left: 30px;
    }

    .shop {
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: ${colors.yellow};  
      ${effects.hoverScale()}
      margin-left: 10px;
    }
  
    .settings {
      ${effects.hoverScale()}
      margin-left: 40px;
    }
  }
`;

export const energyMeterCss = css`
  position: relative;
  width: 300px;
  height: 24px;
  border: 2px solid ${colors.yellowLight};
  border-radius: 3px;
  margin-left: 7px;


  .fill {
    background: ${colors.yellowLight};
    height: 100%;
    transition: width 1s ease-out;
  }

  .reserved {
    transition: width 1s ease-out;
  }

  .energy_count {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const collectionCss = css`
  position: relative;
  transition: transform 0.1s ease-out;
  cursor: pointer;
  width: 53px;
  height: 40px;
  
  &:hover {
    transform: scale(1.35);
  }

  .image {
    border: 1px solid ${colors.steel};
    border-radius: 2px;

    &.card_0 {
      position: absolute;
      left: 9px;
      top: 4px;
      transform: rotate(-35deg);
    }

    &.card_1 {
      position: absolute;
      left: 22px;
      top: 3px;
      transform: rotate(25deg);
    }
  }
`;
