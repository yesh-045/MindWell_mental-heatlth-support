import React from "react";
import { Link } from 'react-router-dom';
import women1 from "./imgs/Group 958.svg";
import women2 from "./imgs/Group 959.svg";
import women3 from "./imgs/Vector.svg";

const Activities = () => {
  return (
    <div className="max-w-[1400px] mx-auto pt-12 flex">
      <div className="w-1/2 mr-20">
        <div>
          <h3 className="text-2xl font-bold py-3">Stress Relief Activities</h3>
        </div>
        <div className="text-sm py-3">
          <p>
            Embrace tranquility and unleash your stress into the abyss as you
            dive <p>into the enchanting realm of PlayerOrbit's Chill Zone, where
            laughter and </p> <p>joy intertwine with whimsical games and soul-soothing
            activities,</p> <p>providing the perfect sanctuary for your weary mind to
            rejuvenate and </p>rediscover the harmony within.
          </p>
        </div>
        <div>
        <Link to="/stress-relief">
          <button className="bg-green-400 rounded-full w-48 h-8 my-3">
            Let's get Started...
          </button>
        </Link>
      </div>
      </div>
      {/* right side image */}
      <div className="mr-6 justify-end">
        <img className="w-[250px]" src={women3} alt="" />
        <img className="w-[250px] mt-4" src={women2} alt="" />
        
      </div>
      <div className="mt-32">
        <img className='w-[250px]' src={women1} alt="" /> 
        </div>
    </div>
  );
};

export default Activities;



