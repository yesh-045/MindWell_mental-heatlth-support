import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const PositiveWordPuzzle = () => {
    const positiveWords = [
        "happy", "joy", "love", "peace", "kind", "smile", "hope", "bright", 
        "strong", "calm", "brave", "cheer", "dream", "faith", "grace", "honor",
        "laugh", "magic", "play", "trust", "bliss", "delight", "energy", "shine",
        "beauty", "wisdom", "wonder", "health", "honest", "thank", "hug", "pure", 
        "support", "unity", "victory", "warmth", "glow", "harmony", "inspire", 
        "nurture", "patience", "positive", "serenity", "strength", "triumph", 
        "vibrant", "youth", "zest", "abundance", "balance", "clarity", "devotion", 
        "empower", "forgive", "glorious", "happiness", "imagine", "joyful", 
        "kindness", "laughter", "miracle", "noble", "optimism", "peaceful", 
        "radiant", "sincere", "treasure", "uplift", "victorious", "wisdom", 
        "zeal", "acceptance", "belief", "compassion", "courage", "dazzling", 
        "enlighten", "freedom", "generous", "harmony", "integrity", "jubilant", 
        "loyalty", "mindful", "nourish", "openness", "passion", "quality", 
        "respect", "stability", "tranquil", "understand", "vitality", "wholesome", 
        "xenial", "youthful", "zen"
    ];

    const [currentWord, setCurrentWord] = useState('');
    const [shuffledWord, setShuffledWord] = useState([]);
    const [userWord, setUserWord] = useState('');
    const [result, setResult] = useState('');

    const navigate = useNavigate(); 

    useEffect(() => {
        startPuzzle();
    }, []);

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    const startPuzzle = () => {
        const word = positiveWords[Math.floor(Math.random() * positiveWords.length)];
        setCurrentWord(word);
        setShuffledWord(shuffle(word.split('')));
        setResult('');
        setUserWord('');
    };

    const checkWord = () => {
        if (userWord.toLowerCase() === currentWord) {
            setResult(`Correct! The word is: ${currentWord}`);
        } else {
            setResult("Try again! You can do it!");
        }
    };

    const showAnswer = () => {
        setResult(`The correct word is: ${currentWord}`);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-pink-100 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-blue-700">Positive Word Puzzle</h1>
                <div id="puzzleContainer" className="flex flex-wrap justify-center mb-4">
                    {shuffledWord.map((letter, index) => (
                        <div key={index} className="bg-teal-400 p-4 m-1 text-white text-xl rounded-lg">
                            {letter}
                        </div>
                    ))}
                </div>
                <div id="inputContainer" className="mb-4">
                    <input
                        type="text"
                        id="wordInput"
                        placeholder="Type the word here"
                        className="border-2 border-teal-700 rounded-md p-2 w-full text-center text-xl"
                        value={userWord}
                        onChange={(e) => setUserWord(e.target.value)}
                    />
                </div>
                <div id="buttonsContainer" className="mb-4">
                    <button
                        className="bg-teal-700 text-white py-2 px-4 rounded-lg mr-2"
                        onClick={checkWord}
                    >
                        Check
                    </button>
                    <button
                        className="bg-teal-700 text-white py-2 px-4 rounded-lg mr-2"
                        onClick={startPuzzle}
                    >
                        Next Word
                    </button>
                    <button
                        className="bg-teal-700 text-white py-2 px-4 rounded-lg"
                        onClick={showAnswer}
                    >
                        Show Answer
                    </button>
                </div>
                <div id="result" className="text-xl font-semibold">
                    {result}
                </div>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
                    onClick={() => navigate('/')} // Navigate to the home page
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default PositiveWordPuzzle;
