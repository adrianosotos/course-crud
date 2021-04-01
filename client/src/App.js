import './styles/App.css';
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import useFindUser from './hooks/useFindUsers'
import { UserContext } from './hooks/userContext'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import PrivateRoute from './pages/privateRoute'
import Header from './components/header'

function App() {
  const { user, setUser } = useFindUser()

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Switch>
            <Route path="/login" component={Login} exact />
            <PrivateRoute path='/' component={Dashboard} exact />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
