import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Card, cardHeight, cardWidth } from '../card/Card';
import { zIndex } from '../styles';

const cardStringCss = css`
  position: relative;
  display: inline;

  .card_string {
    text-decoration: underline;
    cursor: pointer;
  }

  .card {
    display: none;
    z-index: ${zIndex.mouseEventArea5};

    &:hover {
      display: none !important;
    }
  }

  &:hover {
    .card {
      display: block;
    }
  }
`;

export const CardsTooltipWrapper = ({
  cardIds,
  cardNames,
  bottomAlign = true,
  leftAlign = true,
  className = '',
  children
}) => (
  <div css={cardStringCss} className={`cards_tooltip_wrapper ${className}`}>
    {children}
    {(cardIds || cardNames || []).map((i, index) => (
      <div key={index} css={css`
        position: absolute;
        top: ${bottomAlign ? 20 : (-1 * (cardHeight + 10))}px;
        ${leftAlign
          ? `left: ${(cardWidth + 5) * index}px;`
          : `right: ${(cardWidth + 5) * index}px;`}
      `}>
        <Card
          key={index}
          cardId={cardIds && i}
          cardName={cardNames && i}
        />
      </div>
    ))}
  </div>
);
