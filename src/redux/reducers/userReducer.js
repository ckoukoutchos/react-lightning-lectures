import { FETCH_USERS, FETCH_USERS_SUCCESS } from '../actionTypes';

// store must have initial state, even if an empty object
const initialState = {
  loading: false,
  users: []
};

/*
  Reducer functions take in the current state of the store and an action
  (both plain JS objects) and returns a state object. Reducers must not mutate the state of the store, instead they should return a NEW object and any updated fields should be NEW objects as well. Reducers must always return a state object, even if it's just the previous state object
*/

// when reducer is first called (when the store is created in index.js), uses initialState as default value
export default function (state = initialState, action) {

  // switch based on actionTypes
  switch (action.type) {
    // when call is made to fetch users
    case FETCH_USERS: {
      return {
        // spread the previous state properties, then overwrite with any updates
        ...state,
        loading: true
      };
    }

    // when call to fetch user is successful
    case FETCH_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: action.users
      };
    }
    // if type doesn't match any case, return previous state
    default:
      return state;
  }
}