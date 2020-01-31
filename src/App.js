import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import ListItem from './ListItem';
import Notification from './Notification';
import './App.css';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchChar, setSearchChar] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
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
      const newPerson = {name: newName, number: newNumber};
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
          setMessage(`${newPerson.name} has been added.`)
          setTimeout(() => {setMessage(null)}, 5000);
        })
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      personService
        .deletePerson(id)
        .then(response => {
          console.log(response);
          setPersons(persons.filter(person => person.id !== id))
        })
    };
  }

  const personsToShow = searchChar === '' ?
    persons.map(person => {
      return (
        <ListItem
          key={person.id} 
          person={person} 
          handleDelete={handleDelete} 
        />
      );
    }) :
    persons.filter(person => person.name.indexOf(searchChar) > -1)
      .map(foundPerson => {
        return (
          <ListItem 
            key={foundPerson.id} 
            person={foundPerson} 
            handleDelete={handleDelete} 
          />
        );
      });

  return (
    <div>
      <h2>Phonebook</h2>
      {message === null ? null : <Notification message={message} />}
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
      <ul>
        {personsToShow}
      </ul>
    </div>
  );
}

export default App;
