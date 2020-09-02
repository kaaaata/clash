import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
import * as actions from '../../../stores/actions';
import { rarityColors } from '../../cards/rarity';
import { lootableCardPool } from '../../cards/cards';
import { random, sample } from 'lodash';
import { packs } from '../../shop/packs';
import { genPackCards } from '../../shop/genPackCards';
import { CardLootModal } from '../../modals/CardLootModal';
import { EventModal, EventModalPage } from '../../modals/EventModal';

export const TreasureChest = ({ rng, closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');

  let lootText;
  let lootCb;
  let lootCards = [];
  let lootPack;
  let greenText;
  
  if (rng < 0.05) {
    const gold = random(100, 150);
    lootText = <span className='yellow'>{gold} gold!</span>
    lootCb = () => dispatch(actions.adjustPlayerGold(gold));
    greenText = `Receive ${gold} gold.`;
  } else if (rng < 0.15) {
    lootText = <span className={rarityColors.uncommon}>two uncommon cards!</span>
    lootCb = () => setPage('card_loot_modal');
    lootCards = [sample(lootableCardPool.uncommon), sample(lootableCardPool.uncommon)];
  } else if (rng < 0.25) {
    lootText = <span className={rarityColors.rare}>a rare card!</span>
    lootCb = () => setPage('card_loot_modal');
    lootCards.push(sample(lootableCardPool.rare));
  } else if (rng < 0.3) {
    lootText = <span className={rarityColors.legendary}>a legendary card!</span>
    lootCb = () => setPage('card_loot_modal');
    lootCards.push(sample(lootableCardPool.legendary));
  } else if (rng < 0.35) {
    lootPack = 'bronze';
  } else if (rng < 0.4) {
    lootPack = 'silver';
  } else if (rng < 0.45) {
    lootPack = 'gold';
  } else if (rng < 0.5) {
    lootPack = 'diamond';
  } else {
    const gold = random(50, 75);
    lootText = <span className='yellow'>{gold} gold!</span>
    lootCb = () => dispatch(actions.adjustPlayerGold(gold));
    greenText = `Receive ${gold} gold.`;
  }

  if (lootPack) {
    lootText = `a ${lootPack} pack!`;
    lootCb = () => setPage('card_loot_modal');
    lootCards = genPackCards(packs[lootPack]);
  }

  if (lootCards.length) {
    greenText = 'Select cards to keep.';
  }

  return page === 'card_loot_modal' ? (
    <CardLootModal
      cards={lootCards}
      closeModal={closeModal}
    />
  ) : (
    <EventModal
      title='Treasure Chest'
      image='treasure_chest'
    >
      <EventModalPage
        key={1}
        text={
          <React.Fragment>
            You open the chest.
            <br /><br />
            It contains {lootText}
          </React.Fragment>
        }
        options={[{
          name: 'Continue',
          greenText,
          onClick: () => {
            lootCb();
            if (!lootCards.length) {
              closeModal();
            }
          }
        }]}
      />
    </EventModal>
  );
};
