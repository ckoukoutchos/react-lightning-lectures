import React, { Component } from 'react';

// component function takes in a component, like a higher order function takes in a function
const withApiCall = (WrappedComponent) => {

  // declare HOC component
  class HOC extends Component {

    state = {
      loading: false,
      users: []
    };

    componentDidMount() {
      this.fetchUsers();
    }

    fetchUsers = () => {
      // set loading to true when call begins
      this.setState({ loading: true });

      // call to apii
      const res = fetch('https://jsonplaceholder.typicode.com/users');

      res.then(data => data.json())
        .then(users => {
          // set users in HOC's local state and loading to false when call is done
          this.setState({ loading: false, users });
        })
        .catch(err => {
          console.log(err);

          // set loading to false when call is done
          this.setState({ loading: false });
        });
    }

    render() {
      /* 
        return wrapped component with HOC's local user state injected as a props
        make sure to pass parent props thru HOC down to the wrapped component
      */
      return <WrappedComponent loading={this.state.loading} users={this.state.users} {...this.props} />;
    }
  }
  // return component
  return HOC;
}

export default withApiCall;