import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { history } from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import "react-dates/lib/css/_datepicker.css";
import {firebase} from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
)

let hasRendered = false;

const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) { //logged in
    store.dispatch(login(user.uid));
    renderApp();
    if(history.location.pathname === '/'){
      history.push('/dashboard');
    }
  } else{
    store.dispatch(logout())
    renderApp();
    history.push('/');
  }
});



ReactDOM.render( <LoadingPage />, document.getElementById('app') );



