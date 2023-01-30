import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatPage from './pages/Chat';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/Register';

function App() {
  return <Router>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/registration' component={RegistrationPage} />
      <Route exact path='/chat' component={ChatPage} />
    </Switch>
  </Router>;
}

export default App;
