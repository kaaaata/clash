// each element has z-index equal to its index in the array.
const zIndexOrder = [
  // lowest
  'default',
  'mouseEventArea1',
  'mouseEventArea2',
  'mouseEventArea3',
  'mouseEventArea4',
  'mouseEventArea5',
  'stickyNav',
  'stickyNavFilter',
  'stickyNavContent',
  'maximum'
  // highest
];
const zIndexObject = {};

zIndexOrder.forEach((item) => {
  zIndexObject[item] = zIndexOrder.indexOf(item);
});

export const zIndex = zIndexObject;
