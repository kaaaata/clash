export const genCardDescription = ({
  heal,
  healEnemy,
  damageSelf,
  pierces,
  onDiscard,
  triggerDiscardOnPlay,
  dealsBanishingDamage,
  customDescription
}) => [
  heal && `Heal ${heal}.`,
  healEnemy && `Heal enemy ${healEnemy}.`,
  damageSelf && `Deal ${damageSelf} to yourself.`,
  pierces && `Damage dealt pierces.`,
  onDiscard && (
    `On ${triggerDiscardOnPlay ? 'play or ' : ''}discard: ${genCardDescription(onDiscard)}`
  ),
  dealsBanishingDamage && 'Damage dealt banishes.',
  customDescription
].filter(Boolean).join(' ');
