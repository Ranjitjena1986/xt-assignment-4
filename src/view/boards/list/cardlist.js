import { getCard } from "./card/card";

export const getCardList = (path,list,boards) => {
    let cards = "";
    let listid = list.replace(" ", "-");
    for (let key of Object.keys(boards['' + path]['' + list])) {            
        let keyid = key.replace(" ", "-");
        cards += getCard(key,keyid,list,listid);
    }
    return cards;  
};