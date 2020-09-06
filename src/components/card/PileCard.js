import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { mixins } from '../styles';
import { Card } from './Card';

export const PileCard = ({
  shouldAnimateEntry,
  cardProps
}) => {
  const animateEntryCss = shouldAnimateEntry ? `
    ${mixins.keyframes('cardAnimatedEntry', `
      0% { transform: rotate3d(0, 1, 0, 45deg); }
      100% { transform: rotate3d(1, 0, 0, 65deg); }
    `)}
    animation: cardAnimatedEntry 0.2s ease-in;
    animation-iteration-count: 1;
  ` : '';
  const pileCardCss = css`
    ${animateEntryCss}
    transform: rotate3d(1, 0, 0, 65deg);
    position: absolute;
    left: ${cardProps.x}px;
    top: ${cardProps.y}px;
  `;

  return (
    <div css={pileCardCss}>
      <Card {...cardProps} x={0} y={0} />
    </div>
  );
};
