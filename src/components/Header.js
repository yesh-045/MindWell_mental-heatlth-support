import React from 'react';
import img1 from './imgs/Group 953.svg'
import img2 from './imgs/pana.svg'
import img3 from './imgs/40066-girl-yoga.svg'
import icon from './imgs/15267-funy-punny.svg'
import './Style.css'
const Header = () => {
    return (
        <div className='header py-10'>
            <div className=" max-w-[1100px] text-center mx-auto">
                <h1 className='text-4xl font-extrabold '>Welcome to PlayerOrbit’s <br /> <span className='flex justify-center items-center '> <span className='text-[#9347CF]'>Chill </span> <span className='text-[#CF47B1] mx-2'> Zone </span><img className='w-12' src={icon} alt="" /> </span>                
                 </h1>
                <p className='py-2 text-sm'>Introducing PlayerOrbit's Chill Zone, the ultimate haven for relaxation, where you can unwind with fun games, engage in stress-relief <br /> activities, and seek counseling for a rejuvenating experience.</p>
                <div className="flex py-1 mt-1 justify-between">
                   <img className='w-32 mt-24' src={img2} alt="" />
                    <img className='w-[400px] h-[360px]' src={img1} alt="" />                   
                     <img className='w-32 h-40 mt-24' src={img3} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Header;