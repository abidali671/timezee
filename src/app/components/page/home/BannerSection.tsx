import Image from 'next/image';
import Link from 'next/link';
import { AnimatedButton } from '../../animatedButton';

const BannerSection = () => {
    return (
        <section className="w-full  ">
            <div className="max-w-[1920px] mx-auto relative">
                <div className="relative h-[500px] md:h-[600px] w-full">
                    <Image
                        src="/images/banner.webp"
                        alt="Roman or Numeral"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="brightness-90"
                    />
                </div>

                {/* Content Box */}
                <div className="absolute top-1/2 left-0 md:left-16 transform -translate-y-1/2 max-w-full md:max-w-2xl px-5 text-center  md:text-left ">
                    <h2 className="text-3xl md:text-3xl font-bold text-white mb-4">
                        Roman or Numeral
                    </h2>
                    <p className="text-gray-200 mb-4 text-sm md:text-lg leading-relaxed">
                        Limited Edition of 200 pieces world-wide. Watch Big Bang, 361.PE.2010.RW.1104.
                        The stainless steel case and band are thick and prominent, creating a durable feel on the wrist.
                        However, the dial is much more whimsical.
                    </p>
                    <p className="text-gray-200 mb-6 text-sm md:text-lg leading-relaxed">
                        Accurate and Comfortable Imported Japanese quartz movement ensures precise time keeping.
                        Its classic design of multi display watches and comfortable silicone material
                        can provide to users excellent outdoor experiences.
                    </p>
                    <Link href="/collections"  >

                        <AnimatedButton className='text-xs  !w-32'>
                            Shop Now
                        </AnimatedButton>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
