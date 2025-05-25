import Link from "next/link";

const footerLinks = [
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Press", href: "/press" },
            { label: "Blog", href: "/blog" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Help Center", href: "/help" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Status", href: "/status" },
        ],
    },
    {
        title: "Services",
        links: [
            { label: "Shop", href: "/shop" },
            { label: "Shipping", href: "/shipping" },
            { label: "Returns", href: "/returns" },
            { label: "Track Order", href: "/track" },
        ],
    },
    {
        title: "Connect",
        links: [
            { label: "Contact Us", href: "/contact" },
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8">
                    {footerLinks.map((section, idx) => (
                        <div key={idx}>
                            <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-yellow-400 transition"
                                            target={link.href.startsWith("http") ? "_blank" : undefined}
                                            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-700"></div>

                <div className="py-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} YourCompany. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
