import React from 'react';
import { Link } from 'react-router-dom';
import tom1 from './imgs/Group 921.svg';
import maze from './imgs/maze.jpg'; // Updated image import
import breathe from './imgs/breathe.jpg';

const Games = () => {
    const games = [
        { id: 1, image: maze, name: "Word Maze", path: '/positive-word-puzzle' }, // Updated name and image
        { id: 2, image: breathe, name: "BreatheEase", path: '/guided-breathing-game' },
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
                        className="bg-transparent flex flex-col items-center"
                    >
                        <div className="flex flex-col items-center bg-transparent">
                            <img className='w-[320px]' src={game.image} alt={game.name} />
                            <span className="mt-2 text-lg font-semibold">{game.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Games;
