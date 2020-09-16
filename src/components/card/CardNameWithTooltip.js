import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { rarityColors } from '../../cards/rarity';
import { cards } from '../../cards/cards';
import { blueprints } from '../../cards/blueprints';
import { CardsTooltipWrapper } from './CardsTooltipWrapper';

const cardNameWithTooltipCss = css`
  text-decoration: underline;
  cursor: pointer;
`;

export const CardNameWithTooltip = ({ cardId, cardName }) => {
  const card = cardName ? blueprints.allCardsObject[cardName] : cards[cardId];

  return (
    <CardsTooltipWrapper
      cardIds={cardId ? [cardId] : null}
      cardNames={cardName ? [cardName] : null}
    >
      <span
        css={cardNameWithTooltipCss}
        className={`${rarityColors[card.rarity]}`}
      >
        {card.name}
      </span>
    </CardsTooltipWrapper>
  );
};
