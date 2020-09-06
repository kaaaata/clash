export const logShuffleCardIntoPile = (consoleLog, player, card, pile) => ({
  type: 'shuffle_card_into_pile',
  consoleLog,
  player,
  card,
  pile
});

export const logHealValue = (consoleLog, player, value) => ({
  type: 'heal_value',
  consoleLog,
  player,
  value
});

export const logHealCard = (consoleLog, player, card) => ({
  type: 'heal_card',
  consoleLog,
  player,
  card
});

export const logPlayCopyOfCard = (consoleLog, player, card) => ({
  type: 'play_copy_of_card',
  consoleLog,
  player,
  card
});

export const logGainShields = (consoleLog, player, value) => ({
  type: 'gain_shields',
  consoleLog,
  player,
  value
});

export const logReceiveDamage = (consoleLog, player, value) => ({
  type: 'receive_damage',
  consoleLog,
  player,
  value
});

export const logReceiveFatalDamage = (consoleLog, player) => ({
  type: 'receive_fatal_damage',
  consoleLog,
  player
});

export const logDiscardCard = (consoleLog, player, dealsBanishingDamage, card) => ({
  type: 'discard_card',
  consoleLog,
  player,
  dealsBanishingDamage,
  card
});

export const logTriggerDiscardEffect = (consoleLog, player, card) => ({
  type: 'trigger_discard_effect',
  consoleLog,
  player,
  card
});

export const logTemporaryStatGain = (consoleLog, player, value, stat) => ({
  type: 'temporary_stat_gain',
  consoleLog,
  player,
  value,
  stat
});

export const logPlayCard = (consoleLog, player, card) => ({
  type: 'play_card',
  consoleLog,
  player,
  card
});

export const logPlayerWins = (consoleLog, player) => ({
  type: 'player_wins',
  consoleLog,
  player
});

export const logTurnBegins = (consoleLog, player) => ({
  type: 'turn_begins',
  consoleLog,
  player
});

export const logCantDrawCard = (consoleLog, player) => ({
  type: 'cant_draw_card',
  consoleLog,
  player
});
