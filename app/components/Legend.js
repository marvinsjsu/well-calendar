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
          Requesting
        </li>
        <li className='text-center'>
          <div className='legend-icon submitted'/>
          Requested</li>
        <li className='text-center'>
          <div className='legend-icon unavailable'/>
          Time Passed
        </li>
      </ul>
    </div>
  );
}