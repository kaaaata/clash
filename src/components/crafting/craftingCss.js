import { css } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';
import { cardWidth, cardHeight } from '../card/Card';

export const craftingCss = css`
  height: 100%;

  .container {
    height: 100%;
  }

  .card_slot {
    width: ${cardWidth}px;
    height: ${cardHeight}px;
    border: 2px solid ${colors.grey};
    box-shadow: 0 0 20px ${colors.grey};
    margin: 0 15px;
    box-sizing: content-box;

    .card {
      box-shadow: unset;
      cursor: pointer;
    }

    &.pointer {
      cursor: pointer;
    }

    &.faded {
      .image {
        opacity: 0.25;
      }
    }

    &.green_border {
      border: 2px solid ${colors.green};
      box-shadow: 0 0 20px ${colors.green};
    }

    &.red_border {
      border: 2px solid ${colors.red};
      box-shadow: 0 0 20px ${colors.red};
    }
  }

  .upgrades {
    width: 550px;

    button {
      margin-bottom: 10px;
    }
  }
`;
