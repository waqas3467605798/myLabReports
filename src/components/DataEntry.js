import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link, Route, BrowserRouter} from 'react-router-dom'




  class DataEntry extends Component{
    constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null,
              mainTestNameListObjects:[],
              refreshTestNameList:false,
              subTestArray:[],
              date:'',
              patientName:'',
              age:'',
              cnic:'',
              contact:'',
              testFee:'',
              refferedBy:'',
              customerPassword:'',
              changeInState:false,
              showButton:false,
              noSubHeads:'',
              reportNumber:null
              

      }

  }


//  async componentDidMount(){
//     var userId = firebase.auth().currentUser.uid;
//     var userEmail = firebase.auth().currentUser.email
    
//     this.setState({user:userId,userEmail:userEmail})
//   }
async componentDidMount(){

  var dataPushPromise = new Promise( (res,rej)=>{
  // var userId = firebase.auth().currentUser.uid;
  // var userEmail = firebase.auth().currentUser.email
  // this.setState({user:userId,userEmail:userEmail})
  firebase.database().ref('reportNumber').on('child_added' , (data)=> {
    this.setState({reportNumber:data.val()})
  }  )


var testObjs = [];

  firebase.database().ref('mainTestNameList').on('child_added' , (data)=> { 
    testObjs.push(data.val())
  }  )


  res(testObjs)
  rej('Some thing went wrong')
} )
dataPushPromise.then((testObj)=>{


this.setState({mainTestNameListObjects:testObj})

}
,
(err)=>{
  alert(err)
}
)

}


changeHandler=(e)=>{
  this.setState({[e.target.name]: e.target.value  })
  
  
  }




refreshTestNameList=()=>{
  this.setState({refreshTestNameList:!this.state.refreshTestNameList})
}

  
shwoSubHeads=()=>{
if(document.getElementById('mainTestDropDownListDataEntry').value){


  var subTestPromise = new Promise((res,rej)=>{
  var mainTest = document.getElementById('mainTestDropDownListDataEntry').value 
  var requiredObj = this.state.mainTestNameListObjects.find((obb)=>{return obb.mainTestName === mainTest})
res(requiredObj)  
})

subTestPromise.then((obj)=>{
  if('subTestArray' in obj){
  // this.setState({subTestArray:obj.subTestArray})
var mainHead = document.getElementById('mainTestDropDownListDataEntry').value
this.state.subTestArray.push({testName:mainHead, subTests:obj.subTestArray})

  // this.state.subTestArray.push(obj.subTestArray)
  // this.state.mainHeadDisplay.push(document.getElementById('mainTestDropDownListDataEntry').value)
  console.log(this.state.subTestArray)
  this.setState({changeInState: !this.state.changeInState, showButton:true, noSubHeads:''})

  }else{
    this.setState({noSubHeads:`No Sub Heads are Available for '${document.getElementById('mainTestDropDownListDataEntry').value}'`})
    
  }
})
  


}else{
  alert("Please select the 'Test Name' first")
}
  
}

setResultValue=(arrayIndex,objectIndex,event)=>{


  // this.state.subTestArray[arrayIndex][objectIndex].result = event.target.value
  this.state.subTestArray[arrayIndex].subTests[objectIndex].result = event.target.value
  console.log(this.state.subTestArray)
  // console.log(arrayIndex)
  // console.log(objectIndex)
}



generateReport = ()=>{
var reportObj = {};
reportObj.date = this.state.date;
reportObj.patientName = this.state.patientName;
reportObj.age = this.state.age;
reportObj.cnic = this.state.cnic;
reportObj.contact = this.state.contact;
reportObj.testFee = this.state.testFee;
reportObj.refferedBy = this.state.refferedBy;
reportObj.customerPassword = this.state.customerPassword;
reportObj.patientReport = this.state.subTestArray;

var testReportNumber = this.state.reportNumber + 1

reportObj.reportNumber = testReportNumber

var key = firebase.database().ref('customerReports').push().key
reportObj.key = key;
      
firebase.database().ref('customerReports').child(key).set(reportObj)
      
alert('Report Successfully Generated')


this.setState({date:'',patientName:'',age:'',cnic:'',contact:'',testFee:'',refferedBy:'',customerPassword:'',subTestArray:[], reportNumber:testReportNumber})
firebase.database().ref('reportNumber').child('reportNumber').set(testReportNumber)
// console.log(reportObj)
}



    render(){
        return(
          <div>
          
          <div className={navigator.onLine===true ? '' : 'display'}>




        <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span>
<br/> <br/>
          <div className='container'>
           
          {/* Patient Information */}
          <span style={{fontSize:'16px',color:'brown'}}> Patient Information</span><br/>
          <input type='text' value={this.state.date} name='date' onChange={this.changeHandler} maxLength='11' placeholder='Date' /><br/>
          <input type='text' value={this.state.patientName} name='patientName' onChange={this.changeHandler} placeholder='Patient Name' /><br/>
          <input type='text' value={this.state.age} name='age' onChange={this.changeHandler} placeholder='Age' /><br/>
          <input type='text' value={this.state.cnic} name='cnic' onChange={this.changeHandler} placeholder='CNIC #' /><br/>
          <input type='text' value={this.state.contact} name='contact' onChange={this.changeHandler} placeholder='Contact Number' /><br/>
          <input type='text' value={this.state.testFee} name='testFee' onChange={this.changeHandler} placeholder='Test Fee (Rs. )' /><br/>
          <input type='text' value={this.state.refferedBy} name='refferedBy' onChange={this.changeHandler} placeholder='Reffered By' /><br/>
          <input type='text' value={this.state.customerPassword} name='customerPassword' onChange={this.changeHandler} placeholder='customer Password' /><br/>
           
           {/* Test Result */}
           <br/><br/>
          <span style={{fontSize:'14px',color:'blue'}}> Test Result Feedings</span><br/>

          <button style={{width:'65%', backgroundColor:'lightblue'}} onClick={this.refreshTestNameList}>Select Main Test Name</button>
          <div style={{width:'65%'}}> <select className='browser-default' id='mainTestDropDownListDataEntry'>  {this.state.mainTestNameListObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.mainTestName}</option>}  )       }   </select> </div>
          <button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'pink'}} onClick={this.shwoSubHeads}> Add </button>
          <div>
          
            {/* {this.state.subTestArray.map((it,ind)=>{return <p key={ind}>{it.subTestName} <input className='browser-default listedInput' type='text' placeholder='Result'/> </p>})} */}
             {/* {this.state.subTestArray.map((it,ind)=>{return <p key={ind}>{it.map((item,index)=>{return <p key={index}>{item.subTestName}<input className='browser-default listedInput' type='text' placeholder='Result'/> </p>})} </p>})} */}
          {/* {this.state.subTestArray.map(  (it,ind)=>{return <div key={ind}>{it.map(  (item,index)=>{return <table key={index}><thead><tr><th>Test Name</th><th>Result</th><th>Range</th></tr></thead><tbody><tr><td>{item.subTestName}</td><td><input className='browser-default listedInput' type='text' placeholder='Result'/></td> <td>{item.range}</td></tr></tbody> </table>}  )}</div>}  )} */}
          {/* {this.state.subTestArray.map(  (it,ind)=>{return <table key={ind}><thead><th>Test Name</th><th>Result</th><th>Range</th></thead><tbody>{it.map(  (item,index)=>{return <tr><td>{item.subTestName}</td><td><input className='browser-default listedInput' type='text' onChange={(e)=>this.setResultValue(ind,index,e)} placeholder='Result'/></td> <td>{item.range}</td></tr>}  )}</tbody></table>}  )} */}
          <span style={{color:'red', fontSize:'16px'}}><b>{this.state.noSubHeads}</b></span>
          <br/><br/>
          {this.state.subTestArray.map(  (it,ind)=>{return <table key={ind}><thead><tr><th colSpan='3' style={{color:'green',textAlign:'center'}}>{it.testName}</th></tr><tr><th>Test Name</th><th>Result</th><th>Range</th></tr></thead><tbody>{it.subTests.map(  (item,index)=>{return <tr key={index}><td>{item.subTestName}</td><td><input className='browser-default listedInput' type='text' onChange={(e)=>this.setResultValue(ind,index,e)} placeholder='Result'/></td><td>{item.range}</td></tr>})}</tbody></table>})}
          <br/>
          
          <div className={this.state.showButton === false ? 'display' : ''}>
          <button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.generateReport}> Generate Report </button>
          </div>
          
          </div>

          </div>

          </div>


          {/* in case, internet is offline */}
          <div className={navigator.onLine===true ? 'display' : 'container'}>
          <span style={{fontSize:'20px', color:'red'}}>Some thing went wrong.... <br/>
          Please check your internet connection</span>
          </div>




          </div>
        )
    }


  }

export default DataEntry;








