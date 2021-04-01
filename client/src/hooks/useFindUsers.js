import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFindUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
      
      async function findUser() {
        const token = window.localStorage.getItem('token')
        await axios.post('http://localhost:5000/api/users', {
          token
        })
          .then(res => setUser(res.data.user))
          .catch(error => {
            console.log(error)
          });
      }
      
      findUser()
  }, [])

    return { user, setUser }
}