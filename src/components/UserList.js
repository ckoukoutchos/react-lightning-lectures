import React from 'react';

import User from './User';
import withApiCall from '../HookHOC';

const UserList = props => {
  const { users } = props;

  // creates a user card for each item in users
  const userList = users.map(user => (
    <User email={user.email} key={user.id} name={user.name} />
  ));

  return userList;
}

// pass app component to HOC
export default withApiCall(UserList);