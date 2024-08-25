import React from 'react';
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
          <h3 className="text-2xl font-bold py-8">Counselling & Therapy</h3>
        </div>

        <div className="flex flex-wrap max-w-[800px] ">
                    <img className='relative  h-[420px]' src={group4} alt="" />
                    <img className='w-[320px] h-72 absolute mt-20' src={logo} alt="" />
                    <div className="w-[300px] mt-60 absolute mx-80 pl-10">
                        <h2 className='text-2xl'>Counselling & Therapy</h2>
                        <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum.</p>
                    </div>
                </div>
        
      </div>
      {/* right side image */}
      <div className="mt-24 ">
        <img className="w-[700px] pb-2 " src={group1} alt="" />
        <img className="w-[700px] mt-5 pb-2" src={group2} alt="" />
        <img className="w-[700px] mt-6 mb-2" src={group3} alt="" />
        
      </div>
        </div>
    );
};

export default Counselling;