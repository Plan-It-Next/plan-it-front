import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gradient-to-r from-purple-600 to-blue-500 text-white py-16">
            {/* Decorative diagonal line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-yellow-300 to-green-400 transform -translate-y-1/2"></div>

            <div className="max-w-6xl mx-auto px-4">
                {/* Main content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* Brand section */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                            PlanIt.
                        </h2>
                        <p className="text-blue-100 max-w-sm">
                            Plan, personalize, and book unforgettable trips, all in one seamless platform.
                        </p>
                        <div className="flex items-center space-x-4 pt-4">
                            {/* Twitter Icon */}
                            <button className="hover:scale-110 transition-transform duration-200">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            {/* GitHub Icon */}
                            <button className="hover:scale-110 transition-transform duration-200">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            {/* Email Icon */}
                            <button className="hover:scale-110 transition-transform duration-200">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 6l-10 7L2 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {['About', 'Services', 'Careers', 'Contact', 'Support'].map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center space-x-1"
                                >
                                    <span className="h-1 w-1 bg-blue-300 rounded-full"></span>
                                    <span>{link}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Stay Updated</h3>
                        <p className="text-blue-100">Subscribe to our newsletter for updates and insights.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-l-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 flex-grow focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <button className="px-4 py-2 bg-white text-purple-600 rounded-r-lg font-medium hover:bg-blue-100 transition-colors duration-200">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2 text-sm text-blue-100">
                        <span>© {currentYear} PlanIt.</span>
                        <span>All rights reserved.</span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                        <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">Privacy</a>
                        <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">Terms</a>
                        <div className="flex items-center space-x-1 text-blue-100">
                            <span>Made with</span>
                            {/* Heart Icon */}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-pink-400">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;