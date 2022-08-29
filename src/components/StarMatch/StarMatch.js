import { useState } from 'react';
import { Game } from '../Game/Game';

//Introduced to mount and unmount games so that we can reset the states and side effectsa
const StarMatch = () => {
    const [ gameId, setGameId] = useState(1);

    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
}

export {
    StarMatch
}
