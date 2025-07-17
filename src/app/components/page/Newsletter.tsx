import { AnimatedButton } from "../animatedButton";
import SectionTitle from "./home/sectionTitle";

export default function Newsletter() {
    return (
        <section
            className="bg-cover bg-center bg-no-repeat py-20 md:py-24"
            style={{
                backgroundImage:
                    "url('https://timzee-demo.myshopify.com/cdn/shop/files/Bg3_90e25fb7-6ee5-42d6-b55b-398e3c403fd8.jpg?v=1614310740&width=1920')",
            }}
        >
            <div className="  px-4 flex flex-col   items-center justify-between gap-8">
                {/* Left Header */}
                <SectionTitle className='text-center *:w-full md:*:w-7/12 *:mx-auto'>
                    NewsLetter
                </SectionTitle>

                {/* Right Form */}
                <div className="w-full max-w-lg md:max-w-2xl h-full">
                    <div className="flex flex-1/2 h-full items-center">
                        <form
                            action="/contact#contact_form"
                            method="POST"
                            className="flex flex-col gap-4  w-full"
                        >
                            <input type="hidden" name="form_type" value="customer" />
                            <input type="hidden" name="contact[tags]" value="newsletter" />

                            <div className="relative">
                                <input
                                    type="email"
                                    name="contact[email]"
                                    required
                                    placeholder="Email Address"
                                    className="w-full px-4 py-3.5   border-1 text-white  "
                                />
                            </div>


                        </form>
                        <AnimatedButton
                            type="submit"
                            className=" h-full !w-20 text-xs"
                        >
                            Subscribe
                        </AnimatedButton>
                    </div>
                    <p className="text-sm text-white mt-4 opacity-80 text-center">
                        Will be used in accordance with our Privacy Policy.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-6">
                        {[
                            { icon: "twitter", href: "#" },
                            { icon: "facebook", href: "#" },
                            { icon: "pinterest", href: "#" },
                            { icon: "instagram", href: "#" },
                            { icon: "tumblr", href: "#" },
                            { icon: "youtube", href: "#" },
                        ].map(({ icon, href }) => (
                            <a
                                key={icon}
                                href={href}
                                className="text-white hover:text-yellow-400 transition"
                                aria-label={icon}
                            >
                                <i className={`fab fa-${icon} text-xl`} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
