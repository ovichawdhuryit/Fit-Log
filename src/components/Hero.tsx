import React from 'react';
import Image from 'next/image';
const Hero = () => {
    return (
        <div className='grid-cols-2 flex justify-between p-29 bg-[#9CA3AF] 
        mx-25 border-0.5 rounded-4xl'>
            <div>
                <p className='text-[#C2F800]'>
                    WORKOUT LIBRARY
                </p>


                <p className='text-5xl mt-1.5'>
                    TRAIN WITH INTENT. LOG <br></br> EVERY SET.
                </p>

                <p className='mt-2'>
                    FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br />
                    into today's plan, and watch the week's work add up.
                </p>

                <button className='border-1 mt-5 bg-[#C2F800] text-black rounded-2xl p-2'>
                    BROWSE WORKOUTS
                </button>

            </div>

            <div>
                <Image src="/banner.png" alt='banner' width={300} height={300}></Image>
            </div>
        </div>
    );
};

export default Hero;
