import React, { Component } from 'react';
import Board from './Board';
import StepCounter from './StepCounter';
import jack from '../jack.png';
import './puzzle.styl';

class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.reader = new FileReader();
    this.reader.onload = () => this.setState({ image: this.reader.result });
  }

  state = {
    image: jack,
    stepCount: 0,
  }

  loadImage = (e) => {
    this.reader.readAsDataURL(e.target.files[0]);
  }

  reset = () => {
    this.setState({ image: jack });
  }

  handleBoardSwap = () => {
    this.setState(({ stepCount }) => ({
      stepCount: stepCount + 1,
    }));
  }

  render() {
    const { image, stepCount } = this.state;

    return (
      <div className="puzzle">
        <div className="img sample" style={{ backgroundImage: `url('${image}')` }} />
        <Board image={image} swap={this.handleBoardSwap} />
        <StepCounter stepCount={stepCount} />
        <div className="input">
          <input type="file" accept="image/*" onChange={this.loadImage} />
          {image === jack ? null : <button onClick={this.reset}>Jack</button>}
        </div>
      </div>
    );
  }
}

export default Puzzle;
