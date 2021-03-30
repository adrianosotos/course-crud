import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../hooks/userContext'

export default function useAuth() {
  let history = useHistory()
  const { setUser } = useContext(UserContext) || {}
  const [error, setError] = useState(null)

  async function setUserContext (token) {
    return await axios.post('http://localhost:5000/api/users',
    {
      token
    })
      .then(res => {
        setUser(res.data.user)
        history.push('/')
      }).catch((error) => {
        setError(error.response.data)
      })
  }

  async function registerUser (data) {
    const { email, password } = data
    return axios.post('http://localhost:5000/api/auth/register', {
      email, 
      password
    })
      .then(async (res) => {
        window.localStorage.setItem('token', res.data.jwt)
        await setUserContext(res.data.jwt)
      })
      .catch((error) => setError(error.msg))
  }

  async function loginUser (data) {
    const { email, password } = data

    return axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    })
      .then(async (res) => {
        window.localStorage.setItem('token', res.data.jwt)
        await setUserContext(res.data.jwt)
      })
      .catch(error => setError(error.msg))
  }

  return { registerUser, loginUser, error }
}