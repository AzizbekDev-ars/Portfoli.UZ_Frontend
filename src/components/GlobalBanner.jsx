import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalBanner = ({ active, text }) => {
    return (
        <AnimatePresence>
            {active && text && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="relative z-[100] bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-[length:200%_auto] animate-gradient-x text-white py-2 px-4 shadow-lg shadow-rose-500/20 overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        <p className="text-center text-xs md:text-sm font-bold tracking-wide uppercase">
                            {text}
                        </p>
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    </div>

                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:10px_10px]"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalBanner;
