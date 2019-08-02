import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center'
  }
};

export default class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
  };

  static defaultProps = {
    text: 'Loading',
    speed: 300
  };

  state = {
    content: this.props.text
  };

  componentDidMount () {
    const { text, speed } = this.props;

    this.loadingInterval = window.setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({ content: text})
        : this.setState(({ content }) => ({ content: content + '.'}))

    }, speed);
  }

  componentWillUnmount () {
    window.clearInterval(this.loadingInterval);
  }

  render () {
    const { content } = this.state;

    return (
      <p style={styles.content}>
        {content}
      </p>
    );
  }
}

