import React, { Component } from 'react';
import s from './SlideshowControl.module.css';

class SlideshowControl extends Component {
  handleDelayChange = (e) => {
    this.props.onDelayChange(e.target.value);
  };

  render() {
    const { isAutoSliding, slideDelay, onStart, onStop } = this.props;

    return (
      <div className={s.container}>
        <div className={s.buttons}>
          {isAutoSliding ? (
            <button className={s.button} type="button" onClick={onStop}>
              Stop Slideshow
            </button>
          ) : (
            <button className={s.button} type="button" onClick={onStart}>
              Start Slideshow
            </button>
          )}
        </div>
        <div>
          <label className={s.label}>Slide Delay (ms):</label>
          <input
            className={s.input}
            type="number"
            value={slideDelay}
            onChange={this.handleDelayChange}
          />
        </div>
      </div>
    );
  }
}

export default SlideshowControl;
