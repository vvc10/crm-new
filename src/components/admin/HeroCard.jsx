import Link from 'next/link';
import React from 'react';
import { HiArrowRight } from 'react-icons/hi';

const HeroCard = ({ head, count, btn_text, path }) => {
  return (
    <div className="bg-op-green rounded-lg shadow-md items-start px-4 py-4 flex flex-col justify-between">
      {/* Header */}
      <div className="text-lg font-semibold text-gray-700">{head}</div>

      {/* Count */}

      
          <div className="text-3xl font-bold text-[#267B60] my-4">
            {count}

          </div>
          {count === 0 ? (
        <div className="text-3xl font-bold text-[#267B60] mt-4 w-full">
          <p className='font-[500] items-baseline text-left text-[16px] bg-op-green w-full text-[#267B60] rounded-md px-4'>Everything is Resolved!</p>
        </div>
      ):(
        <Link href={path} className="px-4 py-2 flex justify-between items-center text-left text-[16px] bg-op-green w-full text-[#267B60] rounded-md hover:bg-[#1f6b50] hover:text-white transition duration-200">
        <span>{btn_text}</span>
        <HiArrowRight />
      </Link>
      )}
 
       

    </div>
  );
};

export default HeroCard;
