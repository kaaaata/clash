// contains unique id's linked to card objects. OK to mutate.

const inDevelopment = process.env.NODE_ENV !== 'production';

window.cards = {};
export let cards = inDevelopment ? window.cards : {};

// cards which are only needed in battle: key like "battle_shortid"
// cards which are mock cards: key like "mock_card"
// upgrade preview cards: key like "upgrade_preview_index"
// all other cards which are expected to stick around: key like "shortid"
