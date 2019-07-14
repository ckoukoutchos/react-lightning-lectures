import React from 'react';

const User = props => (
  <div className='card'>
    <label>Name:</label>
    <p>{props.name}</p>

    <label>Email:</label>
    <p>{props.email}</p>
  </div>
);

export default User;