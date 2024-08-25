import React, { useState, useEffect } from 'react';
import img1 from './imgs/Group 953.svg';
import img2 from './imgs/pana.svg';
import img3 from './imgs/40066-girl-yoga.svg';
import icon from './imgs/15267-funy-punny.svg';
import './Style.css';

const motivationalQuotes = [
    "Believe you can and you're halfway there.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Success doesn’t just find you; you have to go out and get it.",
    "Dream it. Wish it. Do it.",
    "Success is not how high you have climbed, but how you make a positive difference to the world."
];

const Header = () => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setAnimate(true); 
            setTimeout(() => {
                setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
                setAnimate(false); 
            }, 1000); 
        }, 4000); 

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='header py-10'>
            <div className="max-w-[1100px] text-center mx-auto">
                {/* Rotating Motivational Quotes */}
                <div className={`text-2xl font-semibold mb-6 text-gray-800 transition-transform duration-500 ease-in-out ${animate ? 'animate-funny' : ''}`}>
                    {motivationalQuotes[currentQuoteIndex]}
                </div>

                {/* Main Header Content */}
                <h1 className='text-4xl font-extrabold'>
                    Welcome to the  <br />
                    <span className='flex justify-center items-center'>
                        <span className='text-[#9347CF]'> Chill </span> 
                        <span className='text-[#CF47B1] mx-2'> Zone </span>
                        <img className='w-12' src={icon} alt="Icon" />
                    </span>
                </h1>
                <p className='py-2 text-sm'>
                    Introducing PlayerOrbit's Chill Zone, the ultimate haven for relaxation, where you can unwind with fun games, engage in stress-relief <br /> activities, and seek counseling for a rejuvenating experience.
                </p>

                {/* Images Section */}
                <div className="flex py-1 mt-1 justify-between">
                    <img className='w-32 mt-24' src={img2} alt="Image 1" />
                    <img className='w-[400px] h-[360px]' src={img1} alt="Image 2" />
                    <img className='w-32 h-40 mt-24' src={img3} alt="Image 3" />
                </div>
            </div>
        </div>
    );
};

export default Header;
