import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-[090A0D] text-neutral-content justify-between p-6.5">

            
                <div>
                    <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
                    FITLOG
                </div>

                <div className="flex ">
                    <p> © {new Date().getFullYear()} FitLog- Workout Library, Train hard, log honest.</p>
                </div>
            
        </footer>
    );
};

export default Footer;