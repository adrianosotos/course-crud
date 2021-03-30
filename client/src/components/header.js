import { useContext } from 'react';
import { UserContext } from '../hooks/userContext';
import useLogout from '../hooks/useLogout';
import { Link } from 'react-router-dom';

function Header () {
  const { user } = useContext(UserContext) || {}
  const { logoutUser } = useLogout()

  return (
    <header>
      {
        user ?
          <>
            <Link to='/'>Dashboard</Link>
            <button to='/' onClick={logoutUser}>Sair</button>
          </>
          :
          <Link to='/'>Logar/Registrar</Link>
      }
    </header>
  )
}

export default Header