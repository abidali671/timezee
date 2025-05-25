"use client";
import Image from 'next/image';
import { AnimatedButton } from '../../animatedButton';
import { useEffect, useState } from 'react';
import SectionTitle from './sectionTitle';

const DealBanner = () => {
    // Set the end time for the deal (target date)
    const endTime = new Date("2025-12-12T00:00:00").getTime();

    // State to store remaining time
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Function to update the countdown timer
    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            setTimeRemaining({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            });
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
    };
    useEffect(() => {
        const timerInterval = setInterval(updateTimer, 1000);

        // Clear interval on component unmount
        return () => clearInterval(timerInterval);
    }, []);

    return (
        <section id="deal-banner" className="relative py-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://timzee-demo.myshopify.com/cdn/shop/files/Bg1full.jpg?v=1614300918&width=1920"
                    alt="Deal Banner Background"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="z-0"
                />
            </div>

            {/* Banner Content */}
            <div className="relative z-10 flex items-center justify-center w-full h-full px-4 py-8 sm:px-8 lg:px-16">
                <div className="w-full max-w-screen-lg mx-auto flex flex-col justify-center items-center">
                    {/* Banner Title */}
                    <SectionTitle className="font-bold text-white whitespace-nowrap !w-auto">
                        Most Wanted of the Year
                    </SectionTitle>

                    {/* Timer */}
                    <div className="my-6 text-white">
                        <div className="text-2xl">
                            <ul className="flex justify-center *:bg-yellow-400 *:p-4 space-x-6 w-full h-auto rounded-md">
                                <li className="flex flex-col items-center">
                                    <span className="text-4xl font-bold">{timeRemaining.days}</span>
                                    <span className="text-xl">Days</span>
                                </li>
                                <li className="flex flex-col items-center">
                                    <span className="text-4xl font-bold">{timeRemaining.hours}</span>
                                    <span className="text-xl">Hrs</span>
                                </li>
                                <li className="flex flex-col items-center">
                                    <span className="text-4xl font-bold">{timeRemaining.minutes}</span>
                                    <span className="text-xl">Mins</span>
                                </li>
                                <li className="flex flex-col items-center">
                                    <span className="text-4xl font-bold">{timeRemaining.seconds}</span>
                                    <span className="text-xl">Secs</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Shop Now Button */}
                    <div className="mt-6">
                        <AnimatedButton>
                            Shop
                        </AnimatedButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealBanner;
