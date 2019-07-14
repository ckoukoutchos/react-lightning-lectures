import { FETCH_USERS, FETCH_USERS_SUCCESS } from "./actionTypes";

/*
  Action creators are functions that return a plain object (action) to be dispatched to update the store. Though not strictly necessary, it helps keep your code DRY by not having to re-write your action objects each time.
*/

// action for initiating fetch for users
export const fetchUsers = () => ({
  type: FETCH_USERS
});

// action when fetching users is successful
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  users
});