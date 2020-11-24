export const logShuffleCardIntoPile = (consoleLog, player, cardId, pile) => ({
  type: 'shuffle_card_into_pile',
  consoleLog,
  player,
  cardId,
  pile
});

export const logHealValue = (consoleLog, player, value) => ({
  type: 'heal_value',
  consoleLog,
  player,
  value
});

export const logHealCard = (consoleLog, player, cardId) => ({
  type: 'heal_card',
  consoleLog,
  player,
  cardId
});

export const logPlayCopyOfCard = (consoleLog, player, cardId, originPile) => ({
  type: 'play_copy_of_card',
  consoleLog,
  player,
  cardId,
  originPile
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

export const logDiscardCard = (consoleLog, player, dealsBanishingDamage, cardId) => ({
  type: 'discard_card',
  consoleLog,
  player,
  dealsBanishingDamage,
  cardId
});

export const logTriggerDiscardEffect = (consoleLog, player, cardId) => ({
  type: 'trigger_discard_effect',
  consoleLog,
  player,
  cardId
});

export const logTemporaryStatGain = (consoleLog, player, value, stat) => ({
  type: 'temporary_stat_gain',
  consoleLog,
  player,
  value,
  stat
});

export const logPlayCard = (consoleLog, player, cardId) => ({
  type: 'play_card',
  consoleLog,
  player,
  cardId
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

export const logRoundEnds = (consoleLog) => ({
  type: 'round_ends',
  consoleLog
});
