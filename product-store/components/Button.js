import React from 'react';
import { HashLoader } from 'react-spinners';

const Button = ({ children, loading = false, ...props }) => {
    return (
        <button
            {...props}
            disabled={loading}
            className={`w-full p-2 bg-[var(--primaryColor)] text-white rounded relative overflow-hidden ${
                loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[var(--primaryHoverColor)]'
            } focus:outline-none focus:ring-2 focus:ring-blue-100`}
        >
            <span className={`${loading ? 'invisible' : 'visible'}`}>
                {children}
            </span>
            {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <HashLoader color="#fff" size={20} />
                </span>
            )}
        </button>
    );
};

export default Button;
