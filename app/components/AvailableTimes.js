import React from 'react';
import PropTypes from 'prop-types';

export default class AvailableTimes extends React.Component {

  state = {
    availableTimes: []

  }

  render () {
    const { earliestTime } = this.props;

    return (
      <div className='grid'>

      </div>
    );
  }
}