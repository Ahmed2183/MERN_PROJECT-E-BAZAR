import React from 'react';

const ImagesPreview = ({url, heading}) => { //url, heading get from CreateProduct.js
    return (
        <div>
            {url && 
            <div>
                <h1 className='heading'>{heading}</h1>
                <div className='preview-image'>
                 <img src={url} alt='image' className='w-full h-full object-cover'/>
                </div>
            </div>
            }
        </div>
    );
};

export default ImagesPreview;