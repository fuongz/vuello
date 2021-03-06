export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [].concat(arr);
  let itemToAdd = payload;

  if (removedIndex !== null) {
    // eslint-disable-next-line prefer-destructuring
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export const calculatePosition = (cur, prev, next) => {
  let position = 0;

  // Move to the first
  if (typeof prev === 'undefined' && typeof cur !== 'undefined' && typeof next !== 'undefined') {
    position = next.position / 2;
  }

  // Move to the last
  if (typeof prev !== 'undefined' && typeof cur !== 'undefined' && typeof next === 'undefined') {
    position = prev.position + 2 ** 16;
  }

  // Move to the empty list
  if (typeof prev === 'undefined' && typeof next === 'undefined' && typeof cur !== 'undefined') {
    position = 2 ** 16;
  }

  // Normal case
  if (typeof prev !== 'undefined' && typeof cur !== 'undefined' && typeof next !== 'undefined') {
    position = (prev.position + next.position) / 2;
  }

  return position;
};
