import React, { useEffect, useState } from 'react';
import Spinner from './components/Spinner';

// function that takes in a component (WrappedComponent) and returns a new component
const withApiCall = (WrappedComponent) => {

  // define HOC component
  const HOC = (props) => {

    // state for loading
    const [loading, setLoading] = useState(false);
    // state for users
    const [users, setUsers] = useState([]);

    useEffect(() => {
      // set loading to true when call begins
      setLoading(true);

      // call to apii
      const res = fetch('https://jsonplaceholder.typicode.com/users');

      res.then(data => data.json())
        .then(users => {
          // set users in HOC's local state and loading to false when call is done
          setLoading(false);
          setUsers(users);
        })
        .catch(err => {
          console.log(err);
          // set loading to false when call is done
          setLoading(false);
        });
    }, []);

    /* 
      Return wrapped component with HOC's local user state injected as a prop.
      Make sure to pass parent props thru HOC down to the wrapped component or
      return Spinner if loading
    */
    return loading ? <Spinner /> : <WrappedComponent users={users} {...props} />
  }

  // return HOC component
  return HOC;
}

export default withApiCall;