import React from 'react';

export default function Legend () {
  return (
    <div className='flex-row u-margin-top-small u-margin-bottom-medium'>
      <ul className='legend'>
        <li className='text-center'>
          <div className='legend-icon available'/>
          Available
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