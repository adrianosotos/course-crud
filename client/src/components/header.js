import { useContext } from 'react';
import { UserContext } from '../hooks/userContext';
import useLogout from '../hooks/useLogout';
import { Link } from 'react-router-dom';

function Header () {
  const { user } = useContext(UserContext) || {}
  const { logoutUser } = useLogout()

  return (
    <header>
      <nav>
        {user ?
            <>
              <Link to='/'>Dashboard</Link>
              <a to='/' onClick={logoutUser}>Sair</a>
            </>
            :
            <Link to='/'>Logar/Registrar</Link>
        }
      </nav>
    </header>
  )
}

export default Header