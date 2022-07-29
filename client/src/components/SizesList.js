import React from 'react';

const SizesList = ({list,deleteSizes}) => {  //list Catch from CreateProduct.js
    return list.length > 0 &&
    <>
      <h1 className='heading'>Sizes List</h1>
      <div className='flex flex-wrap -mx-2'>
          {list.map(size => (
              <div className='size' key={size.name}
              onClick={() => deleteSizes(size.name)}
              >{size.name}</div>
          ))}

      </div>
    </>
};

export default SizesList;