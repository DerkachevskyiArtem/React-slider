import React, { Component } from 'react';
import s from './SlideshowControl.module.css';

class SlideshowControl extends Component {


  render() {
    const { isAutoSliding, slideDelay, onStart, onStop, onDelayChange} = this.props;

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
          <label className={s.label}>Slide Delay (sec):</label>
          <input
            className={s.input}
            type="text"
            // min="1"
            value={slideDelay}
            onChange={onDelayChange}
          />
        </div>
      </div>
    );
  }
}

export default SlideshowControl;
