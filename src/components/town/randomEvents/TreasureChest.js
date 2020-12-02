import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
import * as actions from '../../../stores/actions';
import { rarityColors } from '../../../cards/rarity';
import { random, sample } from 'lodash';
import { packs } from '../../shop/packs';
import { genPackCardNames } from '../../shop/genPackCardNames';
import { CardLootModal } from '../../modals/CardLootModal';
import { EventModal, EventModalPage } from '../../modals/EventModal';
import { blueprints } from '../../../cards/blueprints';

export const TreasureChest = ({ rng, closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');

  let lootText = '';
  let lootCb;
  let lootCardNames = [];
  let lootPack;
  let greenText;

  if (rng < 0.2) {
    lootText = <span className={rarityColors.uncommon}>two uncommon cards!</span>
    lootCb = () => setPage('card_loot_modal');
    lootCardNames = [
      sample(blueprints.lootableCardsByRarity.uncommon).name,
      sample(blueprints.lootableCardsByRarity.uncommon).name
    ];
  } else if (rng < 0.4) {
    lootText = <span className={rarityColors.rare}>a rare card!</span>
    lootCb = () => setPage('card_loot_modal');
    lootCardNames.push(sample(blueprints.lootableCardsByRarity.rare).name);
  } else if (rng < 0.5) {
    lootText = <span className={rarityColors.legendary}>a legendary card!</span>
    lootCb = () => setPage('card_loot_modal');
    lootCardNames.push(sample(blueprints.lootableCardsByRarity.legendary).name);
  } else if (rng < 0.6) {
    lootPack = 'bronze';
  } else if (rng < 0.7) {
    lootPack = 'silver';
  } else if (rng < 0.8) {
    lootPack = 'gold';
  } else if (rng < 0.9) {
    lootPack = 'diamond';
  } else {
    const gold = random(50, 100);
    lootText = <span className='yellow'>{gold} gold!</span>
    lootCb = () => dispatch(actions.adjustPlayerGold(gold));
    greenText = `Receive ${gold} gold.`;
  }

  if (lootPack) {
    lootText = `a ${lootPack} pack!`;
    lootCb = () => setPage('card_loot_modal');
    lootCardNames = genPackCardNames(packs[lootPack]);
  }

  return page === 'card_loot_modal' ? (
    <CardLootModal
      image={lootPack ? packs[lootPack].image : 'treasure_chest'}
      cardNames={lootCardNames}
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
            if (!lootCardNames.length) {
              closeModal();
            }
          }
        }]}
      />
    </EventModal>
  );
};
