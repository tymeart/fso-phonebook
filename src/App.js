import React, { useState} from 'react';
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Tiffany Lam'}
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const personsList = persons.map((person, i) => <li key={i}>{person.name} {person.number}</li>);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const existingEntry = persons.find(person => person.name === newName);
    if (existingEntry) {
      alert(`${newName} is already in the phonebook.`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>
            <label>Name: </label>
            <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            <label>Phone number: </label>
            <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <button>Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {personsList}
      </ul>
    </div>
  );
}

export default App;
