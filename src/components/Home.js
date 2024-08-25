import React from 'react';
import { Link } from 'react-router-dom';
import logo from './imgs/Group 952.svg';
import button from './imgs/Frame 870.svg';

const Home = () => {
    return (
        <div className='max-w-[1400px] mx-auto'>
            <nav>
                <div className="flex items-center justify-between py-8">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <a href="">
                            <img className='w-30 h-12' src={logo} alt="Logo" />
                        </a>
                    </div>

                    {/* Navigation Links Section */}
                    <div className="flex-grow">
                        <ul className='flex justify-center space-x-6'>
                            <li><a href="">Games & Entertainment</a></li>
                            <li><a href="">Stress Relief Activities</a></li>
                            <li><a href="">Counselling & Therapy</a></li>
                        </ul>
                    </div>

                    {/* Button Section */}
                    <div className="flex items-center space-x-4">
                        <a href="">
                            <img className='h-12 w-24' src={button} alt="Button" />
                        </a>
                        <Link to="/chatbot">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Chat with Bot
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Home;
