import { random } from 'lodash';

export const genMonsterGoldReward = (monster, isMonsterElite, day) => (
  (monster.type === 'wave' ? 25 : 0)
  + (isMonsterElite ? 50 : 0)
  + 10 * monster.tier
  + 3 * day
  + random(0, 10)
);
