import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './List';
import './App.css';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchChar, setSearchChar] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
    }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchChar(event.target.value);
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

  const personsToShow = searchChar === '' ?
    persons.map((person) => <li key={person.id}>{person.name} {person.number}</li>) :
    persons.filter(person => person.name.indexOf(searchChar) > -1)
      .map((foundPerson) => <li key={foundPerson.id}>{foundPerson.name} {foundPerson.number}</li>);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <label>Search names: </label>
        <input value={searchChar} onChange={handleSearchChange} />
      </div>
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
      <List persons={personsToShow}/>
    </div>
  );
}

export default App;
