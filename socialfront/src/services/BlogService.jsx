import axios from 'axios'
//http://localhost:3001
const baseUrl =(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')?'http://localhost:3001/api/blogs':'/api/blogs'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}
const service={ getAll, create, update, remove }
export default service