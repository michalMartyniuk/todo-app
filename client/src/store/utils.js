import axios from 'axios';

export const fetcher = (method, endPoint, data, auth=null) => {
  const url = `/api/${endPoint}`
  const headers = auth ? 
    { 
      'authorization': `Bearer ${localStorage.getItem('token')}`,
      'content-type': 'application/json'
    } : { 'content-type': 'application/json' }

  return new Promise((resolve, reject) => {
    if (method === 'POST') {
      axios({ method, url, headers, data })
        .then( result => resolve(result) )
        .catch( error => reject(error) )
    }
    if (method === 'GET') {
      axios({ method, url, headers })
        .then( result => resolve(result) )
        .catch( error => reject(error) )
    }
  })
}