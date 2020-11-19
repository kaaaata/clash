import React, { useEffect } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { shuffle, sampleSize } from 'lodash';
import { genMonsterDeck } from '../../monsters/genMonsterDeck';
import { genEliteMonsterPrefix } from '../../monsters/genEliteMonsterPrefix';
import { allMonsters } from '../../monsters/monsters';
import { EventModal, EventModalPage } from '../modals/EventModal';
import { cards } from '../../cards/cards';
import { rarityColors } from '../../cards/rarity';
import { controller } from '../../controller';
import { effects } from '../styles';
import { createNewCard } from '../../cards/createNewCard';
import { blueprints } from '../../cards/blueprints';
import shortid from 'shortid';
import { FlexContainer, Image } from '../particles';
import { Attributes } from '../Attributes';

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
  const { deck, day, monster, monsterGoldReward, enemyStatBonuses } = useSelector(state => {
    const flowMonsterOverride = allMonsters.filter(
      i => i.name === (window.flow.monsterOverride_toggle && window.flow.monsterOverride_value)
    )[0];
    return {
      deck: state.clashPlayer.deck,
      day: state.clashTown.day,
      monster: flowMonsterOverride || monsterOverride || state.clashTown.dailyMonster,
      monsterGoldReward: monsterGoldRewardOverride || state.clashTown.dailyMonsterGoldReward,
      enemyStatBonuses: state.clashBattleStats.enemyStatBonuses
    };
  }, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCanVisitShop(false));
  });
  
  const isMonsterElite = !monsterOverride && [3, 6, 9].includes(day);
  const yourDeck = shuffle(deck); // cardIds
  const enemyDeckCardNames = genMonsterDeck(monster, day); // monster.deck cardNames
  const monsterName = `${isMonsterElite ? `${genEliteMonsterPrefix()} ` : ''}${monster.name}`;
  
  const battleOnClick = () => {
    dispatch(actions.setBattleInitialState());
    const enemyDeckIds = enemyDeckCardNames.map(
      cardName => createNewCard(cardName, `battle_${shortid.generate()}`)
    );
    dispatch(actions.setEnemy({
      name: monsterName,
      image: monster.image,
      type: monster.type,
      isEnemyElite: isMonsterElite,
      stats: monster.stats
    }));
    dispatch(actions.setStats({
      stats: monster.stats,
      type: 'stats',
      player: 'enemy',
      operation: 'set'
    }));
    dispatch(actions.setYourDeck(
      (controller.yourDeck || yourDeck.slice(0, yourDeck.length - 3))
        .map(cardId => createNewCard(cards[cardId], `battle_${shortid.generate()}`))
    ));
    dispatch(actions.setEnemyDeck(
      (controller.enemyDeck || enemyDeckIds.slice(0, enemyDeckIds.length - 3))
        .map(cardId => createNewCard(cards[cardId], `battle_${shortid.generate()}`))
    ));
    dispatch(actions.setYourHand(
      (controller.yourHand || yourDeck.slice(yourDeck.length - 3))
        .map(cardId => createNewCard(cards[cardId], `battle_${shortid.generate()}`))
    ));
    dispatch(actions.setEnemyHand(
      controller.enemyHand || [
        ...enemyDeckIds.slice(enemyDeckIds.length - 3)
          .map(cardId => createNewCard(cards[cardId], `battle_${shortid.generate()}`))
      ]
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

  const imageComponentOverride = (
    <FlexContainer flexDirection='column' alignItems='center'>
      <Image
        src={`${monster.image}.png`}
        height={270}
        width={300}
        size='contain'
        _css={isMonsterElite
          ? `${effects.rainbow} animation: rainbow 5s infinite;`
          : ''
        }
      />
      <Attributes stats={monster.stats} statBonuses={enemyStatBonuses} />
    </FlexContainer>
  );

  return (
    <EventModal
      title={title}
      imageComponentOverride={imageComponentOverride}
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
