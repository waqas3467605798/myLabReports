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
              customerReports:[],
              loadCustomerList:false,
              refreshList:false,
              getReportObject:{}
      }

  }


  async componentDidMount(){
    var dataPushPromise = new Promise( (res,rej)=>{
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email
    this.setState({user:userId,userEmail:userEmail})

      var list = []

    firebase.database().ref('customerReports').on('child_added' , (data)=> { 
      list.push(data.val())
    }  )


    res(list)
    rej('Operation Failed: Data From Firebase does not push in state successfully')
  } )
  dataPushPromise.then((customerObj)=>{
  
    this.setState({customerReports:customerObj.sort((a, b) => (a.reportNumber < b.reportNumber) ? 1 : -1), loadCustomerList:true})
  
  
  })
  
  }

  refreshList=()=>{
    this.setState({refreshList: !this.state.refreshList})
  }

  
  getReport=()=>{
    // var reportNo = document.getElementById('repNo').value
  
    // var ourObj = this.state.customerReports.find((obj)=>{return obj.reportNumber === reportNo})

    // console.log(ourObj)
  }


    render(){
        return(
          <div>
        <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span>
<br/> <br/>

          {/* Div of to getting Customer Report */}
          <div className='container'>
          <span style={{fontSize:'19px',color:'blue'}}>Please Enter Report Number</span><br/><br/>
          <input type='text' id='repNo' placeholder='Enter Report Number Here'/> <br/>
          <button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.getReport}>Get Report</button>  
          </div>

<br/><br/><br/>

          {/* Div of List of all customer Reports */}
          <div className='container'>
          <button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.refreshList}>Show List</button>  
        <div className={this.state.loadCustomerList===false?'display' : ''}>
        <table className='browser-default'><thead><tr style={{backgroundColor:'lightyellow'}}><th>R#</th><th>Date</th><th>Name</th><th>Age</th><th>Test Name</th></tr></thead><tbody>{this.state.customerReports.map((it,ind)=>{return <tr key={ind}><td>{it.reportNumber}</td><td>{it.date}</td><td>{it.patientName}</td><td>{it.age}</td><td>{it.patientReport.map((item,index)=>{return <span key={index}>{item.testName} , </span>})}</td></tr>})}</tbody></table>
        </div>
          </div>

          </div>
        )
    }


  }

export default GetReport;





  