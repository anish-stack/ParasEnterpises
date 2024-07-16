import React from 'react';

const Heading = ({ level = '2', children, className = '', ...rest }) => {
    const Tag = `h${level}`;
    
    return (
        <div className="text-center mt-6 mb-6">
            <Tag  className={`text-2xl md:text-5xl lg:text-7xl font-bold mb-2  text-gray-800 ${className}`} {...rest}>
                {children}
            </Tag>
            <hr className="w-16 mx-auto border-t-2 border-gray-300" />
        </div>
    );
}

export default Heading;
