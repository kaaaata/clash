import { css, jsx } from '@emotion/core'; /** @jsx jsx */
// import { cards } from '../cards/cards';
import { Card } from '../Card';
import { Modal } from './Modal';
// import { rarityScore } from '../cards/rarity';

// maybe it would be more useful to sort by "recently added" instead?
// const sortFunc = (a, b) => {
//   const cardA = cards[a];
//   const cardB = cards[b];
//   if (rarityScore[cardA.rarity] > rarityScore[cardB.rarity]) {
//     return -1;
//   } else if (rarityScore[cardA.rarity] < rarityScore[cardB.rarity]) {
//     return 1;
//   } else if (cardA.name < cardB.name) {
//     return -1;
//   } else if (cardA.name > cardB.name) {
//     return 1;
//   }

//   return 0;
// };

// the margin/padding is a hack to prevent card clipping on hover
const collectionCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  height: 425px;
  overflow: scroll;
  margin: -25px;
  padding: 25px;

  .card:last-child {
    margin-bottom: 25px;
  }
`;

export const CardViewModal = ({
  title,
  shouldShowCardCount = true,
  cards,
  cardOnClick,
  closeModal
}) => (
  <Modal
    title={`${title}${shouldShowCardCount ? ` (${cards.length})` : ''}`}
    closeModal={closeModal}
  >
    <div css={collectionCss}>
      {cards.map((card, index) => (
        <Card
          key={index}
          name={card}
          onClick={cardOnClick ? () => cardOnClick(card) : null}
          />
      ))}
    </div>
  </Modal>
);
