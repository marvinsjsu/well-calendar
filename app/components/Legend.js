import React from 'react';

export default function Legend () {
  return (
    <div className='flex-row u-margin-bottom-small'>
      <ul className='legend'>
        <li className='text-center'>
          <div className='legend-icon available'/>
          <p>Available</p>
        </li>
        <li className='text-center'>
          <div className='legend-icon requesting'/>
          Desired
        </li>
        <li className='text-center'>
          <div className='legend-icon submitted'/>
          Requested</li>
        <li className='text-center'>
          <div className='legend-icon unavailable'/>
          Unavailable
        </li>
      </ul>
    </div>
  );
}