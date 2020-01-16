import React, { useState} from 'react';
import List from './List';
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchChar, setSearchChar] = useState('');

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
    persons.map((person, i) => <li key={i}>{person.name} {person.number}</li>) :
    persons.filter(person => person.name.indexOf(searchChar) > -1)
      .map((foundPerson, i) => <li key={i}>{foundPerson.name} {foundPerson.number}</li>);

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
