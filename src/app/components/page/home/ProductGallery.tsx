import { banners } from '@/lib/products';
import Image from 'next/image';
import { AnimatedButton } from '../../animatedButton';

const ProductGallery = () => {
    return (
        <section className="bg-white w-full">
            <div className="w-full ">
                <div className="flex flex-wrap justify-center w-full">
                    {banners.map((banner, idx) => (
                        <div
                            key={idx}
                            className="relative w-full sm:w-2/4 lg:w-4/12 h-64 overflow-hidden group"
                        >
                            <Image
                                src={banner.img}
                                alt={banner.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 cursor-pointer bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center px-4">
                                <h3 className="text-white text-xl font-semibold mb-2">{banner.title}</h3>
                                <p className="text-gray-200 text-sm mb-3">{banner.description}</p>

                                <AnimatedButton className='text-xs'>
                                    View Collection

                                </AnimatedButton>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default ProductGallery;
