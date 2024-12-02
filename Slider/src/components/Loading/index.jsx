import React from 'react';
import s from './Loading.module.css'

function Loading() {
  return (
    <div className={s.loadingContainer}>
      <div className={s.spinner}></div>
      <p className={s.loadingText}>LOADING...</p>
    </div>
  );
}

export default Loading;
