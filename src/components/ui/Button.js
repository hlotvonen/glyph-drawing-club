import React from 'react';

const Button = ({ children, onClick, btnColor = 'teal', labelColor, disabled, type, style, ...props }) => {
    return (
        <button
            className={}
        >
            {children || 'label'}
        </button>
    );
};

export default Button;