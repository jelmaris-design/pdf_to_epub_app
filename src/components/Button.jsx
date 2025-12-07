import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) => {
    const baseStyles = "w-full py-3 px-6 rounded-xl font-semibold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-teal-400 to-primary text-teal-900 hover:shadow-lg hover:scale-[1.02]",
        secondary: "bg-white border-2 border-primary text-teal-700 hover:bg-primary/10",
        accent: "bg-secondary text-pink-900 hover:bg-pink-300",
        ghost: "bg-transparent shadow-none text-gray-600 hover:bg-gray-100"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
