import react, {Component , useRef} from 'react'
import '../App.css';
import firebase from './Fire'
import {Link, Route, BrowserRouter} from 'react-router-dom'
import {useReactToPrint} from 'react-to-print'






  class GetReportCompo extends Component{
    constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null,
              customerReports:[],
              loadCustomerList:false,
              showReport:false,
              displayReportObject:{patientReport:[]},
              noRecordFound:''
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
    rej('Some thing went wrong')
  } )
  dataPushPromise.then((customerObj)=>{
  
    this.setState({customerReports:customerObj, loadCustomerList:true})
  
  
  }
  ,
  (err)=>{
    alert(err)
  }
  )
  
  }

  // refreshList=()=>{
  //   this.setState({refreshList: !this.state.refreshList})
  // }

  
  getReport=()=>{



this.setState({showReport:true})
    var reportNo = document.getElementById('repNo').value
    var reqObjPromise = new Promise( (res,rej)=>{
      var ourObj = this.state.customerReports.find((obj)=>{return obj.reportNumber === Number(reportNo)})
    
    res(ourObj)
    } )

    
    reqObjPromise.then((reqObj)=>{

if(reqObj){

      this.setState({displayReportObject:reqObj})
      // console.log(reqObj)

}else{
  // alert('Report Not Found')
  this.setState({displayReportObject:{patientReport:[]}, showReport:false, noRecordFound:'No Record Found'})
}



    })

  }


    render(){

        return(
          <div>
          <div className={navigator.onLine===true ? '' : 'display'}>



        {/* <span style={{fontSize:'12px'}}><b style={{color:'green',marginLeft:'30px'}}>{this.state.userEmail}</b> / {navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span> */}
<br/> <br/>

          {/* Div of to getting Customer Report */}
          <div className='container'>
          <span style={{fontSize:'14px',color:'blue'}}>Enter Report Number</span><br/>
          <input type='Number' id='repNo' placeholder='Enter Report Number Here'/> <br/>
          <button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.getReport}>Get Report</button>  
          
<br/><br/>
          {/* report display div */}
          <div className={this.state.showReport===false?'display':''} style={{border:'1px solid red', padding:'15px', borderRadius:'10px'}}>
            <div style={{textAlign:'center', color:'blue'}}><span style={{color:'blue', fontSize:'30px'}}><b>ABC Lab Pvt Ltd</b></span><br/><span>ST No.06, Main Bazar, Mansoorabad, Faisalabad</span><br/><span>Contact: 0300-xxxxxxx36</span></div>
            <p style={{textAlign:'right'}}>Report No: {this.state.displayReportObject.reportNumber}<br/>
            Date:{this.state.displayReportObject.date}</p>
            <p style={{color:'brown', backgroundColor:'lightblue', textAlign:'center'}}><b>Customer Information</b></p>
            <table>
              <tbody>
                {/* <tr className={this.state.displayReportObject.date?'':'display'}><td>Date:</td><td>{this.state.displayReportObject.date}</td></tr> */}
                <tr className={this.state.displayReportObject.patientName?'':'display'}><td>Customer Name:</td><td>{this.state.displayReportObject.patientName}</td></tr>
                <tr className={this.state.displayReportObject.age?'':'display'}><td>Age:</td><td>{this.state.displayReportObject.age}</td></tr>
                <tr className={this.state.displayReportObject.cnic?'':'display'}><td>CNIC:</td><td>{this.state.displayReportObject.cnic}</td></tr>
                <tr className={this.state.displayReportObject.contact?'':'display'}><td>Contact:</td><td>{this.state.displayReportObject.contact}</td></tr>
              </tbody>
            </table>
              <br/>
            <p style={{color:'brown', backgroundColor:'lightblue', textAlign:'center'}}><b>Test Report</b></p>
            {this.state.displayReportObject.patientReport.map((item,index)=>{return <div key={index}><b style={{color:'blue',fontSize:'17px'}}>{item.testName}</b><table><thead><tr><th>Test Name</th><th>Result</th><th>Normal Range</th></tr></thead><tbody>{item.subTests.map((it,ind)=>{return <tr key={ind} className={it.result ? '' : 'display'}><td>{it.subTestName}</td><td>{it.result}</td><td>{it.range}</td></tr>})}</tbody></table></div>})} 
            
          </div>
          <span className={this.state.showReport===false?'display':''} style={{fontSize:'10px'}}>
            Note:<br/>
            1-This is computer generated report, no need any signature.<br/>
            2-This report cannot be chellange in any court.
            </span>
          

{/* in case record not found */}
        <div className={this.state.showReport===false ?'' : 'display'}>
        <span style={{color:'red', fontSize:'22px'}}><b>{this.state.noRecordFound}</b></span>
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




  class CustomerList extends Component{
    constructor(){
      super();
      this.state ={
              user:null,
              userEmail:null,
              customerReports:[],
              loadCustomerList:false,
              refreshList:false,
              displayReportObject:{patientReport:[]}
      }

  }


  async componentDidMount(){
    var dataPushPromise = new Promise( (res,rej)=>{
    // var userId = firebase.auth().currentUser.uid;
    // var userEmail = firebase.auth().currentUser.email
    // this.setState({user:userId,userEmail:userEmail})

      var list = []

    firebase.database().ref('customerReports').on('child_added' , (data)=> { 
      list.push(data.val())
    }  )


    res(list)
    rej('Some thing went wrong')
  } )
  dataPushPromise.then((customerObj)=>{
  
    this.setState({customerReports:customerObj})
  


    setTimeout(
      ()=>{
        this.setState({loadCustomerList:true})
      } , 1500
    )
  

  
  }
  ,
  (err)=>{
    alert(err)
  }
  )
  
  }

  refreshList=()=>{
    this.setState({refreshList: !this.state.refreshList})
  }

  
  // getReport=()=>{
  //   var reportNo = document.getElementById('repNo').value
  
  //   var reqObjPromise = new Promise( (res,rej)=>{
  //     var ourObj = this.state.customerReports.find((obj)=>{return obj.reportNumber === Number(reportNo)})
    
  //   res(ourObj)
  //   } )

    
  //   reqObjPromise.then((reqObj)=>{

  //     this.setState({displayReportObject:reqObj})
  //     // console.log(reqObj)
  //   })

    
  // }

  deleteReport = (keyToDelete)=>{
var confirmation = prompt("Enter 'Y' to confirm ")
if(confirmation === 'Y'){

firebase.database().ref('customerReports').child(keyToDelete).remove()
var updateArray = this.state.customerReports.filter(  (obj)=>{return obj.key != keyToDelete}  )
this.setState({customerReports:updateArray})
alert('deleted successfully')
}
else{
  alert('You have entered wrong key')
}
}


    render(){

        return(
          <div>
       
<br/><br/><br/>

          {/* Div of List of all customer Reports */}
          <div className={this.state.loadCustomerList===false?'display' : 'container'}>
          <button style={{padding:'3px',fontSize:'14px',borderRadius:'4px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.refreshList}>Show List</button>  <span style={{color:'red'}}>Last 500-Customers</span>
        {/* <table className='browser-default'><thead><tr style={{backgroundColor:'lightyellow'}}><th>R#</th><th>Date</th><th>Name</th><th>Age</th><th>Contact</th></tr></thead><tbody>{this.state.customerReports.sort((a, b) => (a.reportNumber < b.reportNumber) ? 1 : -1).map((it,ind)=>{return <tr key={ind}><td>{it.reportNumber}</td><td>{it.date}</td><td>{it.patientName}</td><td>{it.age}</td><td>{it.patientReport.map((item,index)=>{return <span key={index}>{item.testNam} , </span>})}</td></tr>}).slice(0,500)}</tbody></table> */}
        {/* <table className='browser-default'><thead><tr style={{backgroundColor:'lightyellow'}}><th>R#</th><th>Date</th><th>Name</th><th>Age</th><th>Contact</th></tr></thead><tbody>{this.state.customerReports.sort((a, b) => (a.reportNumber < b.reportNumber) ? 1 : -1).map((it,ind)=>{return <tr key={ind}><td>{it.reportNumber}</td><td>{it.date}</td><td>{it.patientName}</td><td>{it.age}</td><td>{it.contact}</td><td><a href='#' className="material-icons" style={{color:'red',fontSize:'15px'}} onClick={()=> this.deleteReport(it.key)}>delete</a></td></tr>}).slice(0,500)}</tbody></table> */}
        <table className='browser-default'><thead><tr style={{backgroundColor:'lightyellow'}}><th>R#</th><th>Date</th><th>Name</th><th>Age</th><th>Contact</th><th>Delete</th></tr></thead><tbody>{this.state.customerReports.reverse().map((it,ind)=>{return <tr key={ind}><td>{it.reportNumber}</td><td>{it.date}</td><td>{it.patientName}</td><td>{it.age}</td><td>{it.contact}</td><td><a href='#' className="material-icons" style={{color:'red',fontSize:'15px'}} onClick={()=> this.deleteReport(it.key)}>delete</a></td></tr>}).slice(0,500)}</tbody></table>
        </div>

          <div className={this.state.loadCustomerList===false?'container' : 'display'}>
          <span style={{fontSize:'20px', color:'red'}}>loading ..... <br/> Please Wait</span>
           </div>

          </div>
        )
    }


  }



const GetReport = ()=>{

const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: ()=>componentRef.current,
})

  return(
    <div>
    <GetReportCompo ref={componentRef}/>
    <div style={{textAlign:'center'}}><button style={{padding:'5px',fontSize:'14px',borderRadius:'4px', color:'black', backgroundColor:'lightgreen'}} onClick={handlePrint}>Print Report</button></div>
    <br/><br/><br/><br/>
    <CustomerList />


    
    </div>
  )
}



export default GetReport;





  