import React from 'react';
import { Link } from 'react-router-dom'; 
import group1 from "./imgs/Group 948.svg";
import group2 from "./imgs/Group 949.svg";
import group3 from "./imgs/Group 950.svg";
import group4 from "./imgs/Rectangle 429.png";
import logo from "./imgs/amico.svg";

const Counselling = () => {
    return (
        <div className="max-w-[1400px] mx-auto py-12 flex">
            <div className="w-1/2 mr-20">
                <div>
                    <h3 className="text-2xl font-bold py-8">Counselling</h3>
                </div>

                <div className="flex flex-wrap max-w-[800px] relative">
                    <img className='relative h-[420px]' src={group4} alt="Background" />
                    <img className='w-[320px] h-72 absolute mt-20' src={logo} alt="Logo" />
                    <div className="w-[300px] mt-60 absolute mx-80 pl-10">
                        <h1 className='text-2xl mb-4'>Chat With Our Mental Health Bot</h1>
                        <Link to="/chatbot">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Start Chat
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Right side images */}
            <div className="mt-24">
                <img className="w-[700px] pb-2" src={group1} alt="Group 1" />
                <img className="w-[700px] mt-5 pb-2" src={group2} alt="Group 2" />
                <img className="w-[700px] mt-6 mb-2" src={group3} alt="Group 3" />
            </div>
        </div>
    );
};

export default Counselling;
