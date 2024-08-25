import React from 'react';
import { useParams } from 'react-router-dom';

const GamePage = () => {
    const { id } = useParams();

    return (
        <div className='max-w-[1400px] mx-auto py-12'>
            <h2 className='text-3xl font-bold mb-4'>Game {id}</h2>
            <p>This is where you would implement the game with ID: {id}</p>
        </div>
    );
};

export default GamePage;