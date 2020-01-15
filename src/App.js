import React, { useState} from 'react';
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Tiffany Lam'}
  ]);
  const [newName, setNewName] = useState('');

  const nameList = persons.map((person, i) => <li key={i}>{person.name}</li>);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const addName = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName }))
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          <label>Name: </label>
          <input value={newName} onChange={handleNameChange} />
          <button>Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {nameList}
      </ul>
    </div>
  );
}

export default App;
