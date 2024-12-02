import React from 'react';
import s from './Error.module.css'; // Стилі для компонента Error

function Error({ message }) {
  return (
    <article className={s.errorContainer}>
      <h2 className={s.errorHeading}>Error:</h2>
      <p className={s.errorMessage}>{message}</p>
    </article>
  );
}

export default Error;
