import React, { Component } from 'react';

import User from './User';
import Spinner from './Spinner';
import withApiCall from '../HOC';

class UserList extends Component {
  render() {
    const { loading, users } = this.props;

    // creates a user card for each item in users
    const userList = users.map(user => (
      <User email={user.email} key={user.id} name={user.name} />
    ));

    // displays spinner if loading, user cards otherwise
    return loading ? <Spinner /> : userList;
  }
}

// pass app component to HOC
export default withApiCall(UserList);