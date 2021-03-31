import { useState } from 'react'
import Input from '../components/input'
import useAuth from '../hooks/useAuth'

function Login () {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const { registerUser, loginUser, error } = useAuth()

  async function handleRegister () {
    await registerUser(user)
  }

  async function handleLogin () {
    await loginUser(user)
  }
  
  return (
    <div className="login-form">
      <div>
           { error && error.messages }
      </div>
      <form>
        <Input 
          label="Email"
          name="email"
          onChange={handleChange}
        />
        <Input 
          label="Password"
          name="password"
          type={'password'}
          onChange={handleChange}
        />
      </form>
      <button onClick={handleLogin}>Entrar</button>
      <button onClick={handleRegister}>Inscrever</button>
    </div>
  )
}

export default Login