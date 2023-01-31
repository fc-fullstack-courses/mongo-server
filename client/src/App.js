import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ChatPage from './pages/Chat';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/Register';
import { refresh } from './redux/slices/userSlice';
import CONSTANTS from './constants';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (token) {
      dispatch(refresh(token));
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/registration' component={RegistrationPage} />
        <Route exact path='/chat' component={ChatPage} />
      </Switch>
    </Router>
  );
}

export default App;
