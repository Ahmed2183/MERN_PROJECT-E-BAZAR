import React from 'react';

//For Display Colors
const Color = ({colors,deleteColors}) => {  //colors catch from CreateProduct.js as props
    return (
        <div>
            {colors.length > 0 && 
            <h1 className='heading'>Colors List</h1>}
            {colors.length > 0 && 
            <div className='flex flex-wrap -mx-1'>
             {colors.map(color => (
                 <div className='p-1' key={color.id}>
                     <div className='w-[30px] h-[30px] rounded-full cursor-pointer'
//color:color-->1st color is object that we used in map function on above, 
//2nd color we get from CreateProduct.js in saveColors function through as props */
                     style={{background: color.color}}  
                      onClick={() => deleteColors(color)}> 
                     </div>
                      </div>
             ))}
            </div>
                }
        </div>
    );
};

export default Color;