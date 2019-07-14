import React from 'react';
import './App.css';
import UserList from './components/UserList';

const App = () => (
  <div className='list'>
    <h1 className='title'>Users</h1>
    <UserList />
  </div>
);

export default App;
