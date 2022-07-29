import React from 'react';

const ScreenHeader = ({children}) => {
    return (
        <div className='border-b border-black pb-3 mb-2'>
            {children}
        </div>
    );
};

export default ScreenHeader;