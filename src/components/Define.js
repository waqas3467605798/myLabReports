import react, {Component} from 'react'
import '../App.css';
import firebase from './Fire'
// import {Link} from 'react-router-dom'


  class Define extends Component{
    constructor(){
      super();
      this.state ={
        user:null,
        userEmail:null,
        testNameListObjects:[],
        testName:'',
        normalRange:'',
        showTestNameListStatus:false,
        showMainHeadDiv:true,
        showSubHeadDiv:false,
        mainTestName:'',
        mainTestNameListObjects:[],
        showMainTestNameListStatus:false,
        arrayForDetail:[],
        refreshTestNameList:false,
        noDataSubTestName:false,
        noDataSubTest:''
      }

  }



  async componentDidMount(){
    var dataPushPromise = new Promise( (res,rej)=>{
    // var userId = firebase.auth().currentUser.uid;
    // var userEmail = firebase.auth().currentUser.email
    // this.setState({user:userId,userEmail:userEmail})

      var testObjs = []

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


  

    Logout= ()=>{
        firebase.auth().signOut();
    }


    changeHandler=(e)=>{
    this.setState({[e.target.name]: e.target.value  })
    
    
    }
      
    

showMainHeadDiv=()=>{
      this.setState({showMainHeadDiv:true, showSubHeadDiv:false})
    }


    showSubHeadDiv=()=>{
      this.setState({showMainHeadDiv:false, showSubHeadDiv:true})
    }





saveTestName=()=>{

if(document.getElementById('mainTestDropDownList').value){


var selectedMainTest = document.getElementById('mainTestDropDownList').value
var objIndex = document.getElementById('mainTestDropDownList').selectedIndex
var reqObject = this.state.mainTestNameListObjects.find((ob)=>{return ob.mainTestName === selectedMainTest})


var subTestObj = {};
subTestObj.subTestName = this.state.testName
subTestObj.range = this.state.normalRange

if('subTestArray' in reqObject){
  reqObject.subTestArray.push(subTestObj)
}else{
  var subTestArray = [];
  subTestArray.push(subTestObj)
  reqObject.subTestArray = subTestArray
}


firebase.database().ref('mainTestNameList').child(reqObject.key).set(reqObject)


this.state.mainTestNameListObjects.splice(objIndex,1,reqObject)
this.setState({testName:'', normalRange:''})
alert('Added Successfully')



}else{
  alert("Please select 'Main Test Name' First ")
}

    }


    



    getSubTestNameList = () =>{

      if(document.getElementById('mainTestDropDownListDetail').value){


      var subTestPromise = new Promise((res,rej)=>{
        var mainTest = document.getElementById('mainTestDropDownListDetail').value 
        var requiredObj = this.state.mainTestNameListObjects.find((obb)=>{return obb.mainTestName === mainTest})
        
        if('subTestArray' in requiredObj){
        this.setState({arrayForDetail:requiredObj.subTestArray})
        res('data found')
        }else{
          rej('No data found')
        }

      })

      subTestPromise.then((data)=>{
        this.setState({showTestNameListStatus: true, noDataSubTestName:false})
      },
      (err)=>{
        this.setState({noDataSubTestName:true, showTestNameListStatus:false, noDataSubTest:err})
      }
      )
      
     
    
      }else{
        alert("Please select 'Main Test Name' First ")
      }
    }




editTestName=(i)=>{

  



  var mainTest = document.getElementById('mainTestDropDownListDetail').value 
  var requiredObj = this.state.mainTestNameListObjects.find((obb)=>{return obb.mainTestName === mainTest})
  var indexInStateObject = document.getElementById('mainTestDropDownListDetail').selectedIndex
  
  var reqObjj = requiredObj.subTestArray[i]

var editTest = prompt('Please edit Test Name',reqObjj.subTestName)
if(editTest === null){
  editTest = reqObjj.subTestName
}

var editRange = prompt('Please edit Normal Range of the Test',reqObjj.range)
if(editRange === null){
  editRange = reqObjj.range
}

reqObjj.subTestName = editTest.replace(/  +/g, ' ').trim();
reqObjj.range = editRange.replace(/  +/g, ' ').trim()

requiredObj.subTestArray.splice(i,1,reqObjj)


firebase.database().ref('mainTestNameList').child(requiredObj.key).set(requiredObj)


this.state.mainTestNameListObjects.splice(indexInStateObject,1,requiredObj)

alert('Edited Successfully')



 
}




deleteSubTestName=(i)=>{
  var delKey = prompt("write 'Y' and Press OK")
  if(delKey === 'Y'){
 
  var mainTest = document.getElementById('mainTestDropDownListDetail').value 
  var requiredObj = this.state.mainTestNameListObjects.find((obb)=>{return obb.mainTestName === mainTest})
  var indexInStateObject = document.getElementById('mainTestDropDownListDetail').selectedIndex
  
  requiredObj.subTestArray.splice(i,1)


firebase.database().ref('mainTestNameList').child(requiredObj.key).set(requiredObj)


this.state.mainTestNameListObjects.splice(indexInStateObject,1,requiredObj)

alert('Deleted Successfully')
  }else{
    alert('You have entered wrong key')
  }
}






   saveMainTestName=()=>{
        var testNameExist = this.state.mainTestNameListObjects.find((ob)=>{return ob.mainTestName === this.state.mainTestName})
      
      if(testNameExist){
      alert('This Test Name is already exist')
      }else{
      
      
      
          var mainTestName = this.state.mainTestName;
          // var normalRange = this.state.normalRange;
          var mainTestNameObject = [];
          mainTestNameObject.mainTestName = mainTestName.replace(/  +/g, ' ').trim();
          // testNameObject.normalRange = normalRange.replace(/  +/g, ' ').trim();
          var key = firebase.database().ref('mainTestNameList').push().key
          mainTestNameObject.key = key;
      
          firebase.database().ref('mainTestNameList').child(key).set(mainTestNameObject)
      
          alert('Test Name added Successfully')
          this.setState({mainTestName:''}) 
      }
      }
      
      
      
      
      
      getTestNameList = () =>{
        this.setState({showMainTestNameListStatus: !this.state.showMainTestNameListStatus})
        }
      
      
      
      
        editMainTestName=(i)=>{
      
      
      var reqObj = this.state.mainTestNameListObjects[i]
      var key = reqObj.key
      
      var editTest = prompt('Please edit Test Name',reqObj.mainTestName)
      if(editTest === null){
      editTest = reqObj.mainTestName
      }
      
      // var editRange = prompt('Please edit Normal Range of the Test',reqObj.normalRange)
      // if(editRange === null){
      // editRange = reqObj.normalRange
      // }
      
      reqObj.mainTestName = editTest.replace(/  +/g, ' ').trim();
      // reqObj.normalRange = editRange.replace(/  +/g, ' ').trim()
      
      
      firebase.database().ref('mainTestNameList').child(reqObj.key).set(reqObj)
      
      
      // this.state.mainTestNameListObjects.splice(i,1,reqObj)
      
      alert('Edited Successfully')
      
      
      
        }
      
        deleteMainTestName=(i)=>{
          var delKey = prompt("write 'Y' and Press OK")
    if(delKey === 'Y'){

          var reqObj = this.state.mainTestNameListObjects[i]
          firebase.database().ref('mainTestNameList').child(reqObj.key).remove()
          this.state.mainTestNameListObjects.splice(i,1)
        alert('Deleted sucessfully')
    }else{
      alert('You have entered wrong key')
    }
        }




      
        refreshTestNameList=()=>{
          this.setState({refreshTestNameList: !this.state.refreshTestNameList})
          
        }



    render(){
        return(
          
<div>
{/* Logout Div */}
<div className='container' style={{textAlign:'right'}}>
<button className="waves-effect waves-dark btn red" onClick={this.Logout}>Logout</button> 
</div> 
<br/><br/>


{/* the Div of buttons of define main head and sub head */}
<div className='container'>
<button onClick={this.showMainHeadDiv} style={{fontSize:'12px'}}>Define Main Head</button> <button onClick={this.showSubHeadDiv} style={{fontSize:'12px'}}>Define Sub Head</button>
</div>



{/* Div of Main Head define */}
<div className={this.state.showMainHeadDiv === false ? 'display' : 'container'}>
<br/>
<span style={{fontSize:'19px',color:'blue'}}>Define Main Test Name</span><br/><br/>
<input type='text' value={this.state.mainTestName} name='mainTestName' onChange={this.changeHandler} placeholder='Test Name'/><br/>
<button style={{padding:'10px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:'pink'}} onClick={this.saveMainTestName} >Save</button>
        
        

{/* Code to get list of all opened Main test Names */}
<br/><br/><br/><br/>
<span style={{fontSize:'19px',color:'blue'}}>List of Main Test Names</span><br/>
 <button style={{padding:'6px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.getTestNameList}> {this.state.showMainTestNameListStatus === false ? 'Get List' : 'Hide List'} </button>
 <div className={this.state.showMainTestNameListStatus === false ? 'display' : ''}>
 <table><thead><tr><th>Main Test Name</th><th>edit/delete</th></tr></thead><tbody>{this.state.mainTestNameListObjects.map(  (item,index)=>{return <tr key={index}><td>{(index+1) + '- ' + item.mainTestName}</td><td><a href='#' className="material-icons" style={{color:'green',fontSize:'15px'}} onClick={()=> this.editMainTestName(index)}>edit</a><a href='#' className="material-icons" style={{color:'red',fontSize:'15px'}} onClick={()=> this.deleteMainTestName(index)}>delete</a></td></tr>})    }</tbody></table> 

  </div>
  </div>






{/* Div of Sub head define */}
            <div className={this.state.showSubHeadDiv === false ? 'display' : 'container'}>
              <br/>
              <span style={{fontSize:'19px',color:'brown'}}> Define Sub Test Name</span><br/>
              <button style={{width:'65%',backgroundColor:'lightblue'}} onClick={this.refreshTestNameList}>Select Main Test Name</button>
              <div style={{width:'65%'}}> <select className='browser-default' id='mainTestDropDownList'>  {this.state.mainTestNameListObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.mainTestName}</option>}  )       }   </select> </div><br/>
              <input type='text' value={this.state.testName} name='testName' onChange={this.changeHandler} placeholder='Test Name' /><br/>
              <input type='text' value={this.state.normalRange} name='normalRange' onChange={this.changeHandler} placeholder='Normal Range' /><br/>
              <br/>
              <button style={{padding:'10px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:'pink'}} onClick={this.saveTestName} >Save</button>



{/* Code to get list of all opened sub head names */}
<br/><br/><br/><br/>
              <span style={{fontSize:'19px',color:'brown'}}>List of Sub Test Names</span><br/>
              <button style={{width:'65%', backgroundColor:'lightblue'}} onClick={this.refreshTestNameList}>Select Main Test Name</button>
              <div style={{width:'65%'}}> <select className='browser-default' id='mainTestDropDownListDetail'>  {this.state.mainTestNameListObjects.map(  (item,i)=>{ return <option key={i} className='browser-default'>{item.mainTestName}</option>}  )       }   </select> </div>
              <button style={{padding:'6px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.getSubTestNameList}> Get Detail </button>
              <div className={this.state.showTestNameListStatus === false ? 'display' : ''}>
              <table><thead><tr><th>Test Name</th><th>Range</th><th>edit/delete</th></tr></thead><tbody>{this.state.arrayForDetail.map(  (item,index)=>{return <tr key={index}><td>{(index+1) + '- ' + item.subTestName}</td><td>{item.range}</td><td><a href='#' className="material-icons" style={{color:'green',fontSize:'15px'}} onClick={()=> this.editTestName(index)}>edit</a><a href='#' className="material-icons" style={{color:'red',fontSize:'15px'}} onClick={()=> this.deleteSubTestName(index)}>delete</a></td></tr>})    }</tbody></table>
              </div>

              <div className={this.state.noDataSubTestName === false ? 'display' : ''}>
               <br/>
              <span style={{fontSize:'25px'}}>{this.state.noDataSubTest}</span>
              </div>


{/* {this.state.testNameListObjects.map((ob,i)=>{return <p>{ob.testName}</p>})} */}
            


              </div>
</div>


            
            
        )
    }


  }

export default Define;