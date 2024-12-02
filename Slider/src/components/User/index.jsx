import React from 'react';
import s from './User.module.css';

function User({ user }) {
  const cardClass = user.gender === 'male' ? s.maleCard : s.femaleCard;

  return (
    <article className={`${s.userCard} ${cardClass}`}>
      <img
        className={s.userImg}
        src={user.picture.large}
        alt={`${user.name.first} ${user.name.last}`}
      />
      <h2
        className={s.userHeading}
      >{`${user.name.first} ${user.name.last}`}</h2>
      <p className={s.userEmail}>Email: {user.email}</p>
      <p className={s.userLocation}>
        Location: {`${user.location.city}, ${user.location.country}`}
      </p>
    </article>
  );
}

export default User;
