import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link, Route, BrowserRouter} from 'react-router-dom'




  class GetReport extends Component{
    constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null,
              customerReports:[]
      }

  }


  async componentDidMount(){
    var dataPushPromise = new Promise( (res,rej)=>{
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    this.setState({user:userId,userEmail:userEmail})
    res()
    rej('Operation Failed: Data From Firebase does not push in state successfully')
  } )
  dataPushPromise.then(()=>{
  
    firebase.database().ref('customerReports').on('child_added' , (data)=> { 
      this.state.customerReports.push(data.val())
    }  )
  
  
  })
  
  }



  

    render(){
        return(
          <div>
        <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span>
<br/> <br/>


          <div className='container'>


        <table className='browser-default'><thead><tr><th>R#</th><th>Date</th><th>Name</th><th>Age</th><th>Test Name</th></tr></thead><tbody>{this.state.customerReports.map((it,ind)=>{return <tr key={ind}><td>{it.reportNumber}</td><td>{it.date}</td><td>{it.patientName}</td><td>{it.age}</td><td>{it.patientReport.map((item,index)=>{return <span key={index}>{item.testName}</span>})}</td></tr>})}</tbody></table>


          </div>

          </div>
        )
    }


  }

export default GetReport;





  