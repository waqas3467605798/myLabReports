import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route,BrowserRouter} from 'react-router-dom'
// import App from './App';
import Login from './components/Login'
import CustomerAccess from './components/CustomerAccess'
import reportWebVitals from './reportWebVitals';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'


ReactDOM.render(
  
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <Login />
    {/* <Route exact path='/' component={Login}/> */}
    {/* <Route path='/CustomerAccess' component={CustomerAccess}/>
    </BrowserRouter> */}
  </React.StrictMode>,
  
  document.getElementById('root')
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
