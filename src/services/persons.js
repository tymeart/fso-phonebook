import axios from 'axios';

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson);
}

const update = (id, newInfo) => {
  return axios.put(`${baseUrl}/${id}`, newInfo);
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, create, update, deletePerson };