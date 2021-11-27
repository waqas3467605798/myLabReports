import react, {Component} from 'react'
import Header from './components/Header'
import Define from './components/Define'
import GetReport from './components/GetReport'
import DataEntry from './components/DataEntry'
// import CustomerAccess from './components/CustomerAccess'

import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'





  class App extends Component{

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

Online Lab Test Reports System<br/>
Contact: 0346-7605798 Email: waqas_mba86@yahoo.com
</div>



    </div>
    </BrowserRouter>
  );
}
}

export default App;
