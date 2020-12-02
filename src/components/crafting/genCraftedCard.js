// import { cards } from '../../cards/cards';
// import { createCard } from '../../cards/createCard';

// const twinCustomDescriptions = {
//   'Twin Fire Spears': 'Play 2 copies of Fire.',
//   'Twin Multishots': 'Play 4 copies of Arrow.',
//   'Twin Ice Blades': 'Shuffle 2 copies of Super Frost into your deck.'
// };

// export const genCraftedCard = (card1, card2) => {
//   let result;

//   const type1 = cards[card1].type;
//   const type2 = cards[card2].type;
//   const name1 = cards[card1].name;
//   const name2 = cards[card2].name;

//   if (
//     (type1 === 'attack' && type2 === 'magic')
//     || (type1 === 'magic' && type2 === 'attack')
//   ) {
//     const attack = type1 === 'attack' ? cards[card1] : cards[card2];
//     const magic = type1 === 'attack' ? cards[card2] : cards[card1];

//     if (magic.name === 'Fire') {
//       result = createCard({
//         ...attack,
//         name: `${attack.name} of Fire`,
//         attack: attack.attack + 2,
//         glow: 'red',
//         pierces: true,
//         type: 'magic'
//       });
//     } else if (magic.name === 'Frost') {
//       result = createCard({
//         ...attack,
//         name: `${attack.name} of Frost`,
//         defense: attack.defense + 2,
//         glow: 'blue',
//         pierces: true,
//         type: 'magic'
//       });
//       console.log(result);
//     }
//   } else if (type1 === 'attack' && type2 === 'attack') {
//     // when combining cards, use the earlier alphabetical-sorted card first
//     // exception: "shield" is always first for aesthetic reasons
//     let c1, c2;
//     if (name1 === 'Shield') {
//       c1 = cards[card1];
//       c2 = cards[card2];
//     } else if (name2 === 'Shield') {
//       c1 = cards[card2];
//       c2 = cards[card1];
//     } else {
//       c1 = card1 > card2 ? cards[card2] : cards[card1];
//       c2 = card1 > card2 ? cards[card1] : cards[card2];
//     }

//     const c = {};
//     c.name = name1 === name2
//       ? `Twin ${name1}${name1.endsWith('s') ? '' : 's'}`
//       : `${c1.name} & ${c2.name}`;
//     c.image = c1.image;
//     c.imageSlant = c1.imageSlant;
//     c.craftedImage = c2.image;
//     c.craftedImageSlant = c2.imageSlant;
//     c.rarity = 'crafted';
//     c.attack = c1.attack + c2.attack;
//     c.defense = c1.defense + c2.defense;
//     c.heal = c1.heal + c2.heal;
//     c.healEnemy = c1.healEnemy + c2.healEnemy;
//     // onDiscard
//     c.type = 'attack';
//     c.customDescription = twinCustomDescriptions[c.name] || [
//       c1.customDescription,
//       c2.customDescription
//     ].filter(Boolean).join(' ');
//     c.damageSelf = c1.damageSelf + c2.damageSelf;
//     c.dealsBanishingDamage = c1.dealsBanishingDamage || c2.dealsBanishingDamage;
//     c.banishesOnPlay = c1.banishesOnPlay || c2.banishesOnPlay;
//     c.triggerDiscardOnPlay = c1.triggerDiscardOnPlay || c2.triggerDiscardOnPlay;
//     // customEffect
//     c.pierces = c1.pierces || c2.pierces;
//     [
//       'playCopiesOfCards',
//       'shuffleCardCopiesIntoYourPiles',
//       'shuffleCardCopiesIntoOpponentsPiles'
//     ].forEach(key => {
//       c[key] = [...c1[key], ...c2[key]];
//     });
//     // statBonuses

//     result = createCard(c);
//   }

//   if (result) {
//     cards[result.name] = result;
//     return result.name;
//   } else {
//     return null;
//   }
// };
