import React, { useEffect } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { shuffle, sampleSize } from 'lodash';
import { genMonsterDeck } from '../../monsters/genMonsterDeck';
import { genEliteMonsterPrefix } from '../../monsters/genEliteMonsterPrefix';
import { EventModal, EventModalPage } from '../modals/EventModal';
import { cards } from '../../cards/cards';
import { rarityColors } from '../../cards/rarity';
import { sample } from 'lodash';
import { controller } from '../../controller';
import { effects } from '../styles';
import { createNewCard } from '../../cards/createNewCard';
import { blueprints } from '../../cards/blueprints';

const CardsRarityString = ({ cardNames, cardIds, showCrafted }) => {
  const rarityCounts = { common: 0, uncommon: 0, rare: 0, legendary: 0, crafted: 0 };
  if (cardNames) {
    cardNames.forEach(cardName => {
      rarityCounts[blueprints.allCardsObject[cardName].rarity]++;
    });
  } else {
    cardIds.forEach(cardId => {
      rarityCounts[cards[cardId].rarity]++;
    })
  }

  return (
    <React.Fragment>
      (
      {rarityCounts.legendary} <span className={rarityColors.legendary}>legendary</span>
      ,&nbsp;{rarityCounts.rare} <span className={rarityColors.rare}>rare</span>
      ,&nbsp;{rarityCounts.uncommon} <span className={rarityColors.uncommon}>uncommon</span>
      ,&nbsp;{rarityCounts.common} <span className={rarityColors.common}>common</span>
      {showCrafted && (
        <React.Fragment>
          ,&nbsp;{rarityCounts.crafted} <span className={rarityColors.crafted}>crafted</span>
        </React.Fragment>
      )}
      )
    </React.Fragment>
  );
};

export const MonsterPreview = ({
  title,
  monsterOverride,
  monsterGoldRewardOverride,
  closeModal,
  retreatText = 'Retreat'
}) => {
  const { deck, day, monster, monsterGoldReward } = useSelector(state => ({
    deck: state.clashPlayer.deck,
    day: state.clashTown.day,
    monster: monsterOverride || state.clashTown.dailyMonster,
    monsterGoldReward: monsterGoldRewardOverride || state.clashTown.dailyMonsterGoldReward
  }), shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCanVisitShop(false));
  });

  const isMonsterElite = !monsterOverride && [3, 6, 9].includes(day);
  const yourDeck = shuffle(deck); // cardIds
  const enemyDeckCardNames = genMonsterDeck(monster.deck, day); // cardNames
  const monsterStats = monster.stats;
  const monsterName = `${isMonsterElite ? `${genEliteMonsterPrefix()} ` : ''}${monster.name}`;
  if (isMonsterElite) {
    monsterStats[sample('attack', 'defense', 'magic')]++;
  }

  const battleOnClick = () => {
    const enemyDeckIds = enemyDeckCardNames.map(cardName => createNewCard(cardName));
    dispatch(actions.setBattleInitialState());
    dispatch(actions.setEnemy({
      name: monsterName,
      image: monster.image,
      type: monster.type,
      isEnemyElite: isMonsterElite,
      stats: monsterStats
    }));
    dispatch(actions.setStats({
      stats: monsterStats,
      type: 'stats',
      player: 'enemy',
      operation: 'set'
    }));
    dispatch(actions.setYourDeck(
      controller.yourDeck || yourDeck.slice(0, yourDeck.length - 3)
    ));
    dispatch(actions.setEnemyDeck(
      controller.enemyDeck || enemyDeckIds.slice(0, enemyDeckIds.length - 2)
    ));
    dispatch(actions.setYourHand(
      controller.yourHand || yourDeck.slice(yourDeck.length - 3)
    ));
    dispatch(actions.setEnemyHand(
      controller.enemyHand || [...enemyDeckIds.slice(enemyDeckIds.length - 2), null]
    ));
    dispatch(actions.setBattleRewardCards(
      isMonsterElite
        ? [
          ...sampleSize(enemyDeckIds.filter(cardId => cards[cardId].rarity !== 'common'), 4),
          ...sampleSize(enemyDeckIds.filter(cardId => cards[cardId].rarity === 'common'), 4)
        ].slice(0, 4)
        : sampleSize(enemyDeckIds, 4)
    ));
    dispatch(actions.setBattleRewardGold(monsterGoldReward));
    dispatch(actions.setScene('battle'));
  };
  // battleOnClick();

  const text = (
    <React.Fragment>
      You are attacked by: <span className='yellow'>{monsterName}!</span>
      <br /><br />
      Enemy cards: <span className='bold yellow'>{enemyDeckCardNames.length}</span> <CardsRarityString cardNames={enemyDeckCardNames} />
      <br />
      Your cards: <span className='bold yellow'>{yourDeck.length}</span> <CardsRarityString cardIds={yourDeck} showCrafted />
      <br /><br />
      Victory: <span className='green'>gain {monsterGoldReward} gold</span> and <span className='green'>2 cards from the enemy's deck</span>
      <br />
      Defeat: <span className='red'>{day === 10 ? 'game over!' : 'lose 1 life.'}</span>
    </React.Fragment>
  );

  return (
    <EventModal
      title={title}
      image={monster.image}
      imageContainerCss={isMonsterElite
        ? `${effects.rainbow} animation: rainbow 5s infinite;`
        : ''
      }
    >
      <EventModalPage
        key={1}
        text={text}
        options={[
          {
            name: 'Fight',
            onClick: battleOnClick
          },
          {
            name: retreatText,
            onClick: () => {
              closeModal();
              dispatch(actions.setCanVisitShop(true));
            }
          }
        ]}
      />
    </EventModal>
  );
};
