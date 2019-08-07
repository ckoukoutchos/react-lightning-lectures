import React from 'react';

import User from './User';
import Spinner from './Spinner';
import withApiCall from '../HOC';

const UserList = props => {
  const { loading, users } = props;

  // creates a user card for each item in users
  const userList = users.map(user => (
    <User email={user.email} key={user.id} name={user.name} />
  ));

  // displays spinner if loading, user cards otherwise
  return loading ? <Spinner /> : userList;
}

// pass app component to HOC
export default withApiCall(UserList);