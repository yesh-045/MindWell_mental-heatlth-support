import React from 'react';
import { Link } from 'react-router-dom';
import tom1 from './imgs/Group 921.svg';
import tom2 from './imgs/Group 922.svg';
import tom3 from './imgs/Group 923.svg';


const Games = () => {
    const games = [
        { id: 1, image: tom2, name: "Game 1", path: '/positive-word-puzzle' },
        { id: 2, image: tom3, name: "Game 2", path: '/guided-breathing-game' },
        { id: 3, image: tom1, name: "Game 3", path: '/game/3' },
        
    ];

    return (
        <div className='max-w-[1400px] mx-auto py-12'>
            <h3 className='text-2xl font-bold py-3'>Games & Entertainment</h3>
            <div className="flex flex-wrap justify-between">
                {games.map((game) => (
                    <Link 
                        key={game.id} 
                        to={game.path}
                    >
                        <img className='w-[320px]' src={game.image} alt={game.name} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Games;
