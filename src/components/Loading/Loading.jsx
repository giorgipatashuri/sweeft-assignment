import React from 'react';
import './Loading.scss';
const Loading = () => {
  return (
    <div className='loadingWrapper'>
      <div className='center'>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
      </div>
    </div>
  );
};

export default Loading;
