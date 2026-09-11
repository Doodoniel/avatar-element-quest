import {createRoot} from 'react-dom/client';
import Game from '../components/game/Game';
import ExpeditionGame from '../components/game/ExpeditionGame';
import RescueGame from '../components/game/RescueGame';
import '../app/globals.css';
import '../app/activities.css';
import '../app/projector.css';

declare const __PAGES_BASE__: string;
const screen = location.pathname.slice(__PAGES_BASE__.length).replace(/^\/+|\/+$/g, '') || 'journey';
createRoot(document.getElementById('root')!).render(
  screen === 'expedition' ? <ExpeditionGame/> : screen === 'rescue' ? <RescueGame/> : <Game screen={screen}/>
);
