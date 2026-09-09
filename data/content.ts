export type Level='explorer'|'challenger';
export type Question={id:string;category:string;prompt:string;options:string[];answer:number;explain:string;image?:string;hint?:string};
export const characters=[
 {id:'aang',name:'Aang',nation:'Air Nomads',element:'air',simple:['His name is Aang.','He has got a blue arrow.','He can bend air.'],detail:'Aang is a twelve-year-old airbender from the Southern Air Temple. He is the Avatar. He still needs to learn to master the other elements.',say:'He is from the Air Nomads.'},
 {id:'katara',name:'Katara',nation:'Southern Water Tribe',element:'water',simple:['Her name is Katara.','She has got brown hair and blue eyes.','She can bend water.'],detail:'Katara is a waterbender from the Southern Water Tribe. Sokka is her older brother. She wants to learn more about waterbending.',say:'She is from the Southern Water Tribe.'},
 {id:'sokka',name:'Sokka',nation:'Southern Water Tribe',element:'water',simple:['His name is Sokka.','He has got blue eyes.','He cannot bend water.'],detail:'Sokka is Katara’s older brother. He wants to protect his village. He is a warrior, but he is not a bender.',say:'He is from the Southern Water Tribe.'},
 {id:'zuko',name:'Zuko',nation:'Fire Nation',element:'fire',simple:['His name is Zuko.','He has got a scar.','He can bend fire.'],detail:'Zuko is a prince of the Fire Nation. He is looking for the Avatar. He has a burn scar on the left side of his face.',say:'He is from the Fire Nation.'},
 {id:'appa',name:'Appa',nation:'Air Nomads',element:'air',simple:['His name is Appa.','He has got six legs.','He can fly.'],detail:'Appa is Aang’s flying bison and friend. He has six legs, two horns and a big arrow on his head.',say:'He is Aang’s friend.'},
 {id:'iroh',name:'Iroh',nation:'Fire Nation',element:'fire',simple:['His name is Iroh.','He has got grey hair.','He can bend fire.'],detail:'Iroh is Zuko’s uncle and teacher. He is a former general. He helps Zuko practise firebending.',say:'He is from the Fire Nation.'},
 {id:'gran-gran',name:'Gran Gran',nation:'Southern Water Tribe',element:'water',simple:['Her name is Kanna.','She has got grey hair.','She is their grandmother.'],detail:'Kanna is Katara and Sokka’s grandmother. They call her Gran Gran. She lives in the Southern Water Tribe.',say:'She is from the Southern Water Tribe.'}
];
export const nations=[
 {id:'water',name:'Water Tribes',people:'Waterbenders',home:'The North and South Poles',character:'Katara',sentence:'Katara is from the Southern Water Tribe.',detail:'There are two main Water Tribes: Northern and Southern. Katara and Sokka live in the south. Not everyone in the tribes is a waterbender.',color:'#9bddf8'},
 {id:'earth',name:'Earth Kingdom',people:'Earthbenders',home:'The large eastern continent',character:null,sentence:'Earthbenders can bend earth.',detail:'The Earth Kingdom has towns, farms, mountains and cities. We meet its people later in the story; this is world background, not an episode-one event.',color:'#b4d791'},
 {id:'fire',name:'Fire Nation',people:'Firebenders',home:'The western volcanic islands',character:'Zuko',sentence:'Zuko is from the Fire Nation.',detail:'The Fire Nation is a group of islands west of the Earth Kingdom. Zuko and Iroh are from the Fire Nation.',color:'#ffb39a'},
 {id:'air',name:'Air Nomads',people:'Airbenders',home:'Four mountain temples',character:'Aang',sentence:'Aang is from the Air Nomads.',detail:'The Air Nomads had Northern, Southern, Eastern and Western Air Temples. Aang’s home was the Southern Air Temple. They did not all live in the west.',color:'#efdbb4'}
];
export const words=[
 {word:'water',image:'water',meaning:'We drink it. It is in rivers and the sea.',example:'Katara can bend water.',easy:true,asset:'water.png'},
 {word:'air',image:'air',meaning:'We breathe it. Wind is moving air.',example:'Aang can bend air.',easy:true,asset:'air.png'},
 {word:'earth',image:'earth',meaning:'The ground, soil and rocks.',example:'Earthbenders can move rocks.',easy:true,asset:'earth.png'},
 {word:'fire',image:'fire',meaning:'It is hot. It gives light and heat.',example:'Zuko can bend fire.',easy:true,asset:'fire.png'},
 {word:'friend',meaning:'Someone you like and enjoy being with.',example:'Appa is Aang’s friend.',easy:true,asset:'appa.png'},
 {word:'village',meaning:'A small place where people live.',example:'Katara lives in a village.',easy:true,asset:'water.png'},
 {word:'airbender',meaning:'A person who can control air.',example:'Aang is an airbender.',easy:false,asset:'aang.png'},
 {word:'waterbender',meaning:'A person who can control water.',example:'Katara is a waterbender.',easy:false,asset:'katara.png'},
 {word:'mentor',meaning:'An experienced person who helps you learn.',example:'Iroh is Zuko’s mentor.',easy:false,asset:'iroh.png'},
 {word:'booby trap',meaning:'A hidden trap that works when someone touches or moves something.',example:'There is a booby trap in the old ship.',easy:false,asset:'trap.png'},
 {word:'chores',meaning:'Small jobs you do at home.',example:'We help with the chores.',easy:false,asset:'chores.png'},
 {word:'general',meaning:'An important leader in an army.',example:'Iroh is a former general.',easy:false,asset:'iroh.png'},
];
const q=(id:string,category:string,prompt:string,options:string[],answer:number,explain:string,image?:string,hint?:string):Question=>({id,category,prompt,options,answer,explain,image,hint});
export const quizzes:Record<Level,Question[]>={
 explorer:[
 q('e1','Faces','Who is this?',['Aang','Sokka'],0,'His name is Aang.','aang','His name begins with A.'),
 q('e2','Faces','Katara is a girl. Choose the word: ___ is Katara.',['He','She'],1,'She is Katara.','katara','We use she for Katara.'),
 q('e3','Faces','What has Katara got?',['Green eyes','Blue eyes'],1,'She has got blue eyes.','katara','Look at her eyes.'),
 q('e4','The world','Where is Zuko from?',['The Fire Nation','The Water Tribes'],0,'He is from the Fire Nation.','zuko','Zuko can bend fire.'),
 q('e5','The world','Where is Aang from?',['The Earth Kingdom','The Air Nomads'],1,'He is from the Air Nomads.','aang','Aang can bend air.'),
 q('e6','The world','Katara lives with the…',['Southern Water Tribe','Fire Nation'],0,'She is from the Southern Water Tribe.','katara','She lives in the snow, near the South Pole.'),
 q('e7','Can you?','What can Appa do?',['Fly','Bend fire'],0,'Appa can fly.','appa','Look up in the sky!'),
 q('e8','Can you?','What can Katara bend?',['Earth','Water'],1,'She can bend water.','katara','Her people are the Water Tribes.'),
 q('e9','Can you?','Can Sokka bend water?',['Yes, he can.','No, he cannot.'],1,'Sokka cannot bend water.','sokka','Katara is a bender. Her brother is a warrior.'),
 q('e10','The story','Who do Katara and Sokka find in the ice?',['Aang','Zuko'],0,'They find Aang in an iceberg.','aang','He has got a blue arrow.'),
 q('e11','The story','Who is Katara’s brother?',['Iroh','Sokka'],1,'Sokka is Katara’s brother.','sokka','They go fishing together.'),
 q('e12','The story','What has Appa got?',['Six legs','Two legs'],0,'Appa has got six legs.','appa','Count his legs when you watch.')
 ],
 challenger:[
 q('c1','Faces','Who is a former general and Zuko’s mentor?',['Sokka','Iroh','Aang'],1,'Iroh is Zuko’s uncle, teacher and a former general.','iroh'),
 q('c2','Faces','Zuko’s scar is on the right side of his face.',['True','False'],1,'It is on his left, which appears on your right when he faces you.','zuko'),
 q('c3','Faces','Who is Kanna?',['Aang’s grandmother','Zuko’s mother','Katara and Sokka’s grandmother'],2,'Kanna is their grandmother. They call her Gran Gran.','gran-gran'),
 q('c4','The world','Which pairing is correct?',['Air Nomads — airbenders','Earth Kingdom — firebenders','Fire Nation — waterbenders'],0,'Airbenders belong to the Air Nomads. Not every person in every nation is a bender.'),
 q('c5','The world','What makes the Avatar special?',['The Avatar has six legs.','The Avatar can learn to master all four elements.','The Avatar belongs to the Fire Nation only.'],1,'The Avatar can master all four elements. Aang still needs training.','aang'),
 q('c6','The world','Where do Katara and Sokka live?',['At the North Pole','In the Earth Kingdom','In the Southern Water Tribe'],2,'They live in a village near the South Pole.','water'),
 q('c7','The story','What are Katara and Sokka doing at the beginning?',['Fishing','Visiting an air temple','Training with Iroh'],0,'They are fishing when their argument leads to the discovery of Aang.','katara'),
 q('c8','The story','Aang already knows about the hundred-year war.',['True','False'],1,'False. He learns about the war from Katara in the old ship.','aang'),
 q('c9','The story','Why is the abandoned ship dangerous?',['Appa is inside.','It is an air temple.','It has booby traps.'],2,'Katara warns Aang about the booby traps. A trap sends a signal into the sky.','fire'),
 q('c10','Words','What is a mentor?',['Someone who helps you learn','A hidden trap','A small village'],0,'A mentor is an experienced person who helps someone learn.','iroh'),
 q('c11','Words','Choose the correct sentence.',['Katara have got blue eyes.','Katara has got blue eyes.','Katara is got blue eyes.'],1,'Use has got with he, she and it.','katara'),
 q('c12','The story','Which order matches episode one?',['Old ship → iceberg → fishing','Iceberg → fishing → old ship','Fishing → iceberg → old ship'],2,'First they go fishing, then they find Aang, and later Aang and Katara explore the old ship.')
 ]
};
export const practice:Record<Level,Question[]>={explorer:[quizzes.explorer[1],quizzes.explorer[3],quizzes.explorer[7],quizzes.explorer[10]],challenger:[quizzes.challenger[6],quizzes.challenger[7],quizzes.challenger[8],quizzes.challenger[11]]};
export const sentences:Record<Level,string[]>={explorer:['Her name is Katara.','He can bend air.','She has got blue eyes.'],challenger:['Iroh is Zuko’s uncle and mentor.','Katara and Sokka find a boy in an iceberg.','Aang does not know about the war.']};
