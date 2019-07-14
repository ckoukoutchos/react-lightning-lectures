import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/actions';

import User from './User';
import Spinner from './Spinner';

class UserList extends Component {
  componentDidMount() {
    // dispatches FETCH_USERS action
    this.props.getUsers();
  }

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

/*
  Function called every time the store state changes and is passed the entire state object. Should return a plain JS object with a map of the slices of state needed by the component
*/
const mapStateToProps = state => ({
  loading: state.users.loading,
  users: state.users.users
});

/*
  Function that recieves the Redux dispatch function which is used to send actions to update the store. Should return a plain JS object with a map of methods to send actions from the component
*/
const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
});

/*
  connect is a higher-order component that wraps your component and injects mapStateToProps and/or mapDispatchToProps into the component as props, just like any parent component would.
*/
export default connect(mapStateToProps, mapDispatchToProps)(UserList);