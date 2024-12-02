import React from 'react';
import s from './Navigation.module.css';

function Navigation({ currentUser, onNavigate }) {
  return (
    <div className={s.navContainer}>
      <button onClick={() => onNavigate('prev')} className={s.navButton}>
        Prev
      </button>
      <span>Current user: {currentUser}</span>
      <button onClick={() => onNavigate('next')} className={s.navButton}>
        Next
      </button>
    </div>
  );
}

export default Navigation;
