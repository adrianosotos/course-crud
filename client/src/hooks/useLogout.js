import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../hooks/userContext'
import axios from 'axios'

export default function useLogout() {
  let history = useHistory()
  const { setUser } = useContext(UserContext) || {}

  async function logoutUser () {
    try {
      await axios({
        method: 'GET',
        url: `http://localhost:5000/api/auth/logout`,
      }).then(res => { 
        window.localStorage.removeItem('token')
        setUser(null)
        history.push('/login');
      })
    } catch(err) {
      console.log(err);
    } 
  }

  return { logoutUser }
}
