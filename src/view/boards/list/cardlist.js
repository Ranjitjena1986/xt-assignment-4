import { getCard } from './card/card';

export const getCardList = (path, list, boards) => {
  let cards = '';
  const listid = list.replace(' ', '-');
  for (const key of Object.keys(boards[`${path}`][`${list}`])) {
    const keyid = key.replace(' ', '-');
    cards += getCard(key, keyid, list, listid);
  }
  return cards;
};
