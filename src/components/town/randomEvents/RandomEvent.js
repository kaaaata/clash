import React from 'react';
import { MysteriousPotion } from './MysteriousPotion';
import { TreasureSlime } from './TreasureSlime';
import { RobberyWheel } from './RobberyWheel';
import { CaveFireball } from './CaveFireball';
import { GoblinBomber } from './GoblinBomber';
import { DwarvenSmith } from './DwarvenSmith';
import { CatherineTheGreat } from './CatherineTheGreat';
import { sample } from 'lodash';

const randomEvents = [
  { name: 'Mysterious Potion', probability: 1 },
  { name: 'Treasure Slime', probability: 1 },
  { name: 'Robbery Wheel', probability: 2 },
  { name: 'Cave Fireball', probability: 1 },
  { name: 'Goblin Bomber', probability: 1 },
  { name: 'Dwarven Smith', probability: 2 },
  { name: 'Catherine the Great', probability: 1 },
];
const randomEventPool = [];
randomEvents.forEach(event => {
  for (let i = 0; i < event.probability; i++) {
    randomEventPool.push(event.name);
  }
});

export const RandomEvent = ({ closeModal }) => {
  const rng = Math.random();

  switch (sample(randomEventPool)) {
    case 'Mysterious Potion':
      return <MysteriousPotion rng={rng} closeModal={closeModal} />;
    case 'Treasure Slime':
      return <TreasureSlime rng={rng} closeModal={closeModal} />;
    case 'Robbery Wheel':
      return <RobberyWheel rng={rng} closeModal={closeModal} />;
    case 'Cave Fireball':
      return <CaveFireball rng={rng} closeModal={closeModal} />;
    case 'Goblin Bomber':
      return <GoblinBomber closeModal={closeModal} />;
    case 'Dwarven Smith':
      return <DwarvenSmith closeModal={closeModal} />;
    case 'Catherine the Great':
      return <CatherineTheGreat closeModal={closeModal} />;
    default:
      return null;
  }
};
