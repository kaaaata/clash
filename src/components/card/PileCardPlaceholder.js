import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';
import { cardWidth, cardHeight } from './Card';

export const PileCardPlaceholder = ({ x, y }) => (
  <div css={css`
    width: ${cardWidth}px;
    height: ${cardHeight}px;
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    border: 1px solid ${colors.white};
    border-radius: 5px;
    transform: rotate3d(1, 0, 0, 65deg);
  `} />
);
