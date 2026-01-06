import Link from "next/link";

const footerLinks = [
    {
        title: "Pages",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Contact Us", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms & Conditions", href: "/terms-conditions" },

        ],
    },
    {
        title: "Connect",
        links: [
            { label: "Instagram", href: "https://instagram.com" },
            { label: "Facebook", href: "https://facebook.com" },
            { label: "Twitter", href: "https://twitter.com" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-x-10">

                    {footerLinks.map((section, idx) => (
                        <ul className="flex ">
                            <div key={idx} className="mb-6">
                                <h3 className="text-2xl font-semibold mb-4 text-center">{section.title}</h3>
                                <ul className="space-y-2 flex gap-x-4 flex-col items-center  md:flex-row">
                                    {section.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <Link
                                                href={link.href}
                                                className="hover:text-yellow-400 transition "
                                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ul>
                    ))}

                </div>
                <div className="border-t border-gray-700"></div>
                <div className="py-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} SwissTime. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
