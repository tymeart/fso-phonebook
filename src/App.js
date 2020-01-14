import React, { useState} from 'react';
import './App.css';

function App() {
  const [person, setPersons] = useState([
    { name: 'Tiffany Lam' }
  ]);
  const [newName, setNewName] = useState('');
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <label>Name: </label>
          <input />
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
    </div>
  );
}

export default App;
