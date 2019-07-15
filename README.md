# Concepts: Overview of Redux & Sagas with React

This guide is meant as an introduction to the concepts of Redux (with Sagas). We'll start with the big picture and slowly work our
way down to actual code in a boiler plate project that fetches and displays a list of users.

## 10,000 Feet View

From way up high, we have React components that render data that has been fetched with Sagas and stored in a Redux store (see diagram below).
When data changes on the backend or when a user interacts with the UI, the data rendered with React must change. To keep data changes in-sync
across the application, we use a sigle source of truth, Redux. It acts as a data store, a snapshot of the application state at a point in time.

Components subscribe to portions of the store, allowing them to listen in on changes to the data they care about. When a user changes data
(ex. updating an email address), the component will send a message to the store to inform it of the change. The message will first pass through the Saga
middleware. If it requires an asynchronous event (side-effect) like making an HTTP call, a Saga will run and when it resolves pass a different message along
to the store, otherwise the original message just passes through.

Based on the type of message being passed, the Redux store will accordingly update the application state. These data changes will then be pushed out to
all components interested in the updated portion of the store. React will render components with the new state and the cycle is complete.

**10,000ft Diagram**

![alt text](./diagrams/10000feet.png)

## 1,000 Feet View

Below the clouds, we can begin to make out the flutter of messages passing from components. When a component's data changes, it uses Redux's `dispatch` method to pass a plain JavaScript object (bottom left of diagram).
The object may contain two things: the 'type' of message (action) and maybe a payload (e.g. an updated email address).

The action will pass into the middleware (bottom right of diagram). The middleware is listening for particular types of actions: ones that require some asynchronous code to run. When the middleware finds one, it passes the message to
the relevant Saga, a [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), which exectues the async code (ex. makes a fetch request), pauses until it resolves (gets a response from a server), and then finishes running the code (parsing or transformations). Then, it will create and pass along another action to the store. If the original action was not being listened for by the middleware, it simply passes through unaltered.

Once the action reaches the store, a `reducer` is listening for certain types of actions (top right of diagram). The action type will determine how the reducer updates the state held in the store. It does so immutably and with pure functions: by returning a new state object when an update occurs, instead of mutating the current data, and with functions that do not have any side-effects (async code). These changes are then pushed out (published) to any component that is listening (subscribed) to the data in the store.

Similar to React's [Context API](https://reactjs.org/docs/context.html), Redux has a `<Provider>` component that wraps your `<App>` and allows it to inject data at any layer of the component tree (left side of diagram). A component listens to a portion of the store by wrapping itself in Redux's `connect` method: a higher-order component (HOC) that will pass the store data down to your component as regular old `props` (defined in your component as `mapStateToProps`). When the store data changes, the updated props will trigger the component to re-render with the new state. The connect component will also pass `dispatch` methods for the component to fire off actions (defined in your component as `mapDispatchToProps`). When the UI state changes, a new action can be dispatched and the cycle begins again.

**1,000ft Diagram**

![alt text](./diagrams/1000feet.png)

## Sea Level View

Let's walk through step-by-step how a data change cycle works, starting with the `<UserList>` component. When the component mounts after being initialized, it runs the `componentDidMount` lifecycle method:

```javascript
UserList.js;

componentDidMount() {
  this.props.getUsers();
}
```

The `getUsers()` function is a prop passed by Redux's `connect` HOC to our component. We can define what `dispatch` methods we want passed inside `mapDispatchToProps` and pass it as an argument to `connect`.

```javascript
UserList.js;

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
```

`getUsers` will fire an action to the Redux store to signal an update in state. Here, you could define and pass a plain JS object (message) to `dispatch`, but we are using an action creator: a function that returns an action. This allows us to keep our code DRY (Don't Repeat Yourself) by referencing a single function rather than continually typing out the same object each time.

```javascript
actions.js;

export const fetchUsers = () => ({
  type: FETCH_USERS
});
```

Actions must include at least a `type`, a string to identify it. We could define the type here but we are using a constant `FETCH_USERS` imported from a constants file. This allows us to avoid typo bugs and easy reference/look up of action types since they exist in a single place.

```javascript
actionsTypes.js;

export const FETCH_USERS = 'FETCH_USERS';
```

```javascript
```

## Folder Structure

I will preface this with a disclaimer: there is not a "correct" folder structure for a React/Redux project. It is highly dependant on the size and nature of your application.
What follows are recommendations, not gospel, to be used as guides.

**Small Project**

```
src
...index.js
...components
...redux
......rootReducer.js // actionTypes, action creators, and a reducer
......rootSaga.js // watcher function, sagas
......store.js // create store and middleware
```

**Medium Project**

```
src
...index.js
...components
...redux
......reducers
.........userReducer.js // reducer for user data
.........rootReducer.js // combine reducers
......sagas
.........userSaga.js // watcher function and sagas for user data
.........rootSaga.js // combine sagas
......actions.js // action creators
......actionTypes.js // action type constants
......store.js // create store and middleware
```

**Large Project**

```
src
...index.js
...components
...redux
......rootReducer.js // combine reducers
......rootSaga.js // combine sagas
......store.js // create store and middleware
......user // broken by domain
.........userReducer.js // reducer for user data
.........userSagas.js // watcher function and sagas for user data
.........userActions.js // user action creators
.........userActionTypes.js // user action type constants
```
