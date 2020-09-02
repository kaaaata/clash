import { monstersByTier } from './monsters';
import { sampleSize } from 'lodash';

export const genMonsterWaves = () => [
  ...sampleSize(monstersByTier[1], 3),
  ...sampleSize(monstersByTier[2], 3),
  ...sampleSize(monstersByTier[3], 3)
];
