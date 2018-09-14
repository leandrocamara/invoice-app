
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default http