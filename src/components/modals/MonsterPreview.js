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
import { store } from '../../stores/store';

const CardsRarityString = ({ cardNames, cardIds, showSpecial }) => {
  const rarityCounts = { common: 0, uncommon: 0, rare: 0, legendary: 0, special: 0 };
  if (cardNames) {
    cardNames.forEach(cardName => {
      try {
        rarityCounts[blueprints.allCardsObject[cardName].rarity]++;
      } catch (e) {
        console.log('error: CardsRarityString bugged out. info:', {
          e,
          cardNames,
          cardIds,
          showSpecial,
          state: store.getState()
        });
        const x = 'foo';
        x();
      }
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
      {showSpecial && (
        <React.Fragment>
          ,&nbsp;{rarityCounts.special} <span className={rarityColors.special}>special</span>
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
    const day = state.clashTown.day;
    const flowMonsterOverride = allMonsters.filter(i => i.name === (
      ([1, 2, 3].includes(day)
        && window.flow.monsterOverride1_toggle && window.flow.monsterOverride1_value)
      || ([4, 5, 6].includes(day)  
        && window.flow.monsterOverride2_toggle && window.flow.monsterOverride2_value)
      || ([7, 8, 9].includes(day)
        && window.flow.monsterOverride3_toggle && window.flow.monsterOverride3_value)
      || (day === 10 && window.flow.monsterOverride4_toggle && 'The Evil Dragon')
    ))[0];
    return {
      deck: state.clashPlayer.deck,
      day,
      monster: monsterOverride || flowMonsterOverride || state.clashTown.dailyMonster,
      monsterGoldReward: monsterGoldRewardOverride || state.clashTown.dailyMonsterGoldReward,
      enemyStatBonuses: state.clashBattleStats.enemyStatBonuses
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  
  const isMonsterElite = !monsterOverride && [3, 6, 9].includes(day);
  const yourDeckIds = shuffle(deck); // cardIds
  const enemyDeckCardNames = genMonsterDeck(monster, day); // monster.deck cardNames
  const monsterName = `${isMonsterElite ? `${genEliteMonsterPrefix()} ` : ''}${monster.name}`;
  
  const battleOnClick = () => {
    Object.keys(cards).forEach(cardId => {
      if (cardId.startsWith('battle')) {
        delete cards[cardId];
      }
    });
    const enemyDeckIds = enemyDeckCardNames.map(
      cardName => createNewCard(cardName, `battle_${shortid.generate()}`)
    );

    const yourDeckSorted = (controller.yourDeck || yourDeckIds)
      .map(cardId => createNewCard(cards[cardId], `battle_${shortid.generate()}`))
      .sort((a, b) => cards[a].intrinsic - cards[b].intrinsic);
    const enemyDeckSorted = (controller.enemyDeck || enemyDeckIds)
      .map(cardId => createNewCard(cards[cardId], `battle_${shortid.generate()}`))
      .sort((a, b) => cards[a].intrinsic - cards[b].intrinsic);

    dispatch(actions.setBattleInitialState());
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
    dispatch(actions.setYourDeck(yourDeckSorted.slice(0, yourDeckSorted.length - 3)));
    dispatch(actions.setEnemyDeck(enemyDeckSorted.slice(0, enemyDeckSorted.length - 3)));
    dispatch(actions.setYourHand(controller.yourHand
      ? controller.yourHand.map(cardId => createNewCard(cards[cardId], `battle_${shortid.generate()}`))
      : yourDeckSorted.slice(yourDeckSorted.length - 3)
    ));
    dispatch(actions.setEnemyHand(controller.enemyHand
      ? controller.enemyHand.map(cardId => createNewCard(cards[cardId], `battle_${shortid.generate()}`))
      : enemyDeckSorted.slice(enemyDeckSorted.length - 3)
    ));
    dispatch(actions.setBattleRewardCards(
      isMonsterElite
        ? [
          ...sampleSize(enemyDeckIds.filter(cardId => cards[cardId].rarity !== 'common'), 3),
          ...sampleSize(enemyDeckIds.filter(cardId => cards[cardId].rarity === 'common'), 3)
        ].slice(0, 3)
        : sampleSize(enemyDeckIds, 3)
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
      Your cards: <span className='bold yellow'>{yourDeckIds.length}</span> <CardsRarityString cardIds={yourDeckIds} showSpecial />
      <br /><br />
      Victory: <span className='green'>gain {monsterGoldReward} gold</span> and {monster.type === 'wave' ? 'a ' : ''}<span className='green'>{monster.type === 'wave' ? '3 card draft' : "2 cards from the enemy's deck"}</span>
      <br />
      Defeat: <span className='red'>lose 1 life.</span>
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

  useEffect(() => {
    if (window.flow.skipToBattle_toggle) {
      battleOnClick();
    }
  });

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
            onClick: closeModal
          }
        ]}
      />
    </EventModal>
  );
};
