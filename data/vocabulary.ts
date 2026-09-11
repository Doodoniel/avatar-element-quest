import {words,type Level} from './content';
export type WordCard={word:string;meaning:string;example:string;asset:string;task?:string};
export const episodeWords:WordCard[]=[
 {word:'ice',meaning:'Water that is frozen and hard.',example:'The water is cold. There is ice on the sea.',asset:'expedition/floe.png',task:'What happens to water when it gets very cold?'},
 {word:'iceberg',meaning:'A very large piece of ice floating in the sea.',example:'Katara and Sokka find Aang in an iceberg.',asset:'expedition/iceberg.png',task:'Who is inside the iceberg? Tell your partner.'},
 {word:'ship',meaning:'A large boat that carries people or things across the sea.',example:'Aang and Katara explore an old ship.',asset:'vocabulary/ship.png',task:'Would you explore the old ship? Say why.'},
 {word:'fish',meaning:'An animal that lives in water.',example:'Sokka wants to catch a fish.',asset:'expedition/fish.png',task:'Ask your partner: Can fish fly?'},
 {word:'fishing',meaning:'Trying to catch fish.',example:'Katara and Sokka are fishing at the start of the story.',asset:'vocabulary/fishing.png',task:'What are they doing when they find Aang?'},
 {word:'wake up',meaning:'To stop sleeping.',example:'Aang wakes up after a long time in the ice.',asset:'aang.png',task:'Ask your partner: What time do you wake up?'},
 {word:'explore',meaning:'To look around a place and discover things.',example:'Aang wants to explore the old ship.',asset:'vocabulary/ship.png',task:'Name a place you would like to explore. Say why.'},
 {word:'protect',meaning:'To keep someone or something safe.',example:'Sokka wants to protect his village.',asset:'sokka.png',task:'Who would you protect? How could you help?'},
 {word:'dangerous',meaning:'Something that can hurt you or cause a problem.',example:'The old ship is dangerous because it has traps.',asset:'trap.png',task:'What makes the old ship dangerous?'},
 {word:'trapped',meaning:'Unable to get out of a place.',example:'Aang is trapped inside the iceberg.',asset:'expedition/iceberg.png',task:'Someone is trapped. What could you do to help?'}
];
export const supplyWords:WordCard[]=[
 {word:'scarf',meaning:'Clothes you wear around your neck.',example:'I am cold. I need a scarf.',asset:'expedition/scarf.png'},
 {word:'blanket',meaning:'A warm cover for your body.',example:'Can you bring me a blanket?',asset:'expedition/blanket.png'},
 {word:'boots',meaning:'Shoes that cover your feet and ankles.',example:'My feet are cold. I need boots.',asset:'expedition/boots.png'},
 {word:'book',meaning:'Pages you can read.',example:'I want to read a book.',asset:'expedition/book.png'}
];
export const vocabularyPacks:Record<Level,{id:string;name:string;cards:WordCard[]}[]>={
 explorer:[{id:'core',name:'Elements & friends',cards:words.filter(w=>w.easy)},{id:'episode',name:'Ice & adventure',cards:episodeWords.filter(w=>['ice','iceberg','ship','fish','fishing','wake up'].includes(w.word))},{id:'supplies',name:'Game supplies',cards:[episodeWords[3],...supplyWords]}],
 challenger:[{id:'episode',name:'Episode words',cards:episodeWords.filter(w=>w.word!=='fish'&&w.word!=='ice')},{id:'people',name:'People & jobs',cards:words.filter(w=>!w.easy)},{id:'core',name:'Elements & places',cards:words.filter(w=>w.easy)}]
};
