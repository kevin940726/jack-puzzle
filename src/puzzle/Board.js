import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';

const EMPTY_ID = 8;

class Board extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    swap: PropTypes.func.isRequired,
  };

  state = {
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  }

  componentDidMount() {
    this.shuffle();
    window.addEventListener('keydown', this.keydown);
  }

  componentWillReceiveProps(nextProps) {
    const { image } = this.props;
    if (image !== nextProps.image) this.shuffle();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydown);
  }

  shuffle = () => {
    const grids = this.state.grids.slice();
    grids.sort(() => Math.random() - 0.5);
    this.setState({ grids });
  }

  keydown = (e) => {
    const i = this.state.grids[EMPTY_ID]; // zero position
    switch (e.keyCode) {
      case 37: // left
        if (i % 3 !== 2) this.swap(i, i + 1);
        break;
      case 38: // up
        if (i + 3 < 9) this.swap(i, i + 3);
        break;
      case 39: // right
        if (i % 3 !== 0) this.swap(i, i - 1);
        break;
      case 40: // down
        if (i - 3 >= 0) this.swap(i, i - 3);
        break;
      default:
    }
  }

  swap = (i, j) => {
    const k = this.state.grids.indexOf(j); // swap target idx
    const grids = this.state.grids.slice();
    grids[EMPTY_ID] = j;
    grids[k] = i;
    this.setState({ grids });
    this.props.swap();
  }

  render() {
    const { grids } = this.state;
    const { image } = this.props;

    return (
      <div className="board">
        {grids.map((pos, id) => (
          <Grid
            key={id}
            pos={pos}
            id={id}
            image={image}
            visible={id !== EMPTY_ID}
          />
        ))}
      </div>
    );
  }
}

export default Board;
