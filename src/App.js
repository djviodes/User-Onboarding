import React, { useState } from 'react';
import Form from './components/Form'
import './App.css';

function App() {
  const [user, setUser] = useState([
    {
      name: '',
      email: '',
      password: '',
      role: '',
      terms: false,
    }
  ])

  const addUser = (newUser) => {
    setUser([...user, newUser])
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="amazon-icon.png" className="App-logo" alt="logo" />
        <Form addUser={addUser} />
        {user.map(item => {
          return (
            <div>
              <h1>{item.name}</h1>
              <p>{item.email}</p>
              <p>{item.role}</p>
            </div>
          )
        })}
      </header>
    </div>
  );
}

export default App;
