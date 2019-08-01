import React from 'react';

export default function Legend () {
  return (
    <div className='row margin-top-sm'>
      <ul className='legend'>
        <li className='text-center'>
          <div className='legend-icon available'/>
          Available
        </li>
        <li className='text-center'>
          <div className='legend-icon requesting'/>
          Possible
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