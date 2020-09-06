import { css, jsx } from '@emotion/core'; /** @jsx jsx */
// import { cards } from '../cards/cards';
import { Card } from '../card/Card';
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
const cardViewModalCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  height: 490px;
  overflow: scroll;
  margin: -25px;
  padding: 50px 25px;

  .card:last-child {
    margin-bottom: 25px;
  }

  button {
    position: absolute;
    bottom: 17px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const CardViewModal = ({
  title,
  shouldShowCardCount = true,
  cards,
  cardOnClick,
  closeModal,
  closeButtonText
}) => (
  <Modal
    title={`${title}${shouldShowCardCount ? ` (${cards.length})` : ''}`}
    closeModal={closeModal}
    shouldCloseOnClick={false}
    shouldShowCloseButton
    closeButtonText={closeButtonText}
  >
    <div css={cardViewModalCss}>
      {cards.map((card, index) => card ? (
        <Card
          key={index}
          name={card}
          onClick={cardOnClick ? () => cardOnClick(card, index) : null}
        />
      ) : <div key={index} css={css`display: none;`} />)}
    </div>
  </Modal>
);
