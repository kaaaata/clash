import { css } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';
import { cardWidth, cardHeight } from '../card/Card';

export const craftingCss = css`
  .card_slot, .gold_bar_slot {
    width: ${cardWidth}px;
    height: ${cardHeight}px;
    border: 2px solid ${colors.grey};
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
      border-color: ${colors.green};
      box-shadow: 0 0 20px ${colors.green};
    }

    &.red_border {
      border-color: ${colors.red};
      box-shadow: 0 0 20px ${colors.red};
    }
  }

  button {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }

  .recipes {
    text-align: center;
  }
`;
