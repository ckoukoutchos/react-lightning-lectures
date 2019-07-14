import { put, all, takeEvery } from 'redux-saga/effects';
import { FETCH_USERS } from "../actionTypes";
import { fetchUsersSuccess } from "../actions";

/*
  When an action that your saga middleware is listening for is dispatched, it will trigger a saga that will run some asynchronous code (like fetching data from an API), pause while it waits (without blocking other code in your application from running), and then continue when a response is returned, and eventually dispatch another action with data to update the store.
*/

// middleware listening for actions of type FETCH_USERS, calls fetchUsers saga
export default function* watchUser() {
  yield all([
    takeEvery(FETCH_USERS, fetchUsers)
  ])
}

// logic for calling API for users
function* fetchUsers() {
  // tries to fetch users
  try {
    // calls API for users list
    const response = yield fetch('https://jsonplaceholder.typicode.com/users');

    // converts json to JS object
    const users = yield response.json();

    // dipatches FETCH_USERS_SUCCESS action
    put(fetchUsersSuccess(users));

    // if API call or converting json object fails
  } catch (error) {
    console.log('Oops, something went wrong!');
  }
}