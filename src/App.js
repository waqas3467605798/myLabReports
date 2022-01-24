import react, {Component} from 'react'
import Header from './components/Header'
import Define from './components/Define'
import GetReport from './components/GetReport'
import DataEntry from './components/DataEntry'
import firebase from './components/Fire'
// import CustomerAccess from './components/CustomerAccess'

import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'





  class App extends Component{

constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null,
              
      }

  }




async componentDidMount(){
    
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    this.setState({user:userId,userEmail:userEmail})

   
  }







  render(){
  return (
    <BrowserRouter>
    <div>
    {/* <Route path='/CustomerAccess' component={CustomerAccess}/> */}
      <Header/>
      
      <Route exact path='/' component={Define}/>
      <Route path='/DataEntry' component={DataEntry}/>
      <Route path='/GetReport' component={GetReport}/>
      




<br/><br/>


<div className='bottomLine'> 
<span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span><br/>
Developed By: Waqas Saleem Contact: 0346-7605798 Email: waqas.mba86@gmail.com
 </div>



    </div>
    </BrowserRouter>
  );
}
}

export default App;
