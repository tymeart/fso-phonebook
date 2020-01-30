import React from 'react';

const ListItem = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </li>
  );
}

export default ListItem;