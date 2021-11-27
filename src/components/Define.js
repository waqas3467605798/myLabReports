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
        showMainHeadDiv:false,
        showSubHeadDiv:false,
        mainTestName:'',
        mainTestNameListObjects:[],
        showMainTestNameListStatus:false
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


    firebase.database().ref('testNameList').on('child_added' , (data)=> { 
      this.state.testNameListObjects.push(data.val())
    }  )




    firebase.database().ref('mainTestNameList').on('child_added' , (data)=> { 
      this.state.mainTestNameListObjects.push(data.val())
    }  )


  })

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
var testNameExist = this.state.testNameListObjects.find((ob)=>{return ob.testName === this.state.testName})

if(testNameExist){
  alert('This Test Name is already exist')
}else{






      var testName = this.state.testName;
      var normalRange = this.state.normalRange;
      var testNameObject = [];
      testNameObject.testName = testName.replace(/  +/g, ' ').trim();
      testNameObject.normalRange = normalRange.replace(/  +/g, ' ').trim();
      var key = firebase.database().ref('testNameList').push().key
      testNameObject.key = key;

      firebase.database().ref('testNameList').child(key).set(testNameObject)

      alert('Test Name added Successfully')
      this.setState({testName:'', normalRange:''}) 
}
    }


    



    getSubTestNameList = () =>{
      this.setState({showTestNameListStatus: !this.state.showTestNameListStatus})
      }




editTestName=(i)=>{


var reqObj = this.state.testNameListObjects[i]
var key = reqObj.key

var editTest = prompt('Please edit Test Name',reqObj.testName)
if(editTest === null){
  editTest = reqObj.testName
}

var editRange = prompt('Please edit Normal Range of the Test',reqObj.normalRange)
if(editRange === null){
  editRange = reqObj.normalRange
}

reqObj.testName = editTest.replace(/  +/g, ' ').trim();
reqObj.normalRange = editRange.replace(/  +/g, ' ').trim()


firebase.database().ref('testNameList').child(reqObj.key).set(reqObj)


this.state.testNameListObjects.splice(i,1,reqObj)

alert('Edited Successfully')



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
<button onClick={this.showMainHeadDiv}>Define Main Head</button> <button onClick={this.showSubHeadDiv}>Define Sub Head</button>
</div>



{/* Div of Main Head define */}
<div className={this.state.showMainHeadDiv === false ? 'display' : 'container'}>
<br/>
<span style={{fontSize:'19px',color:'blue'}}>Define Main Test Name</span>
<input type='text' value={this.state.mainTestName} name='mainTestName' onChange={this.changeHandler} placeholder='Test Name'/>
<button style={{padding:'10px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:'pink'}} onClick={this.saveMainTestName} >Save</button>
        
        

{/* Code to get list of all opened Main test Names */}
<br/><br/><br/><br/>
<span style={{fontSize:'19px',color:'blue'}}>List of Main Test Names</span><br/>
 <button style={{padding:'6px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.getTestNameList}> {this.state.showMainTestNameListStatus === false ? 'Get List' : 'Hide List'} </button>
 <div className={this.state.showMainTestNameListStatus === false ? 'display' : ''}>
 <table><thead><tr><th>Main Test Name</th><th>edit/delete</th></tr></thead><tbody>{this.state.mainTestNameListObjects.map(  (item,index)=>{return <tr key={index}><td>{(index+1) + '- ' + item.mainTestName}</td><td><a href='#' className="material-icons" style={{color:'green',fontSize:'15px'}} onClick={()=> this.editMainTestName(index)}>edit</a></td></tr>})    }</tbody></table> 

  </div>
  </div>






{/* Div of Sub head define */}
            <div className={this.state.showSubHeadDiv === false ? 'display' : 'container'}>
              <br/>
              <span style={{fontSize:'19px',color:'brown'}}> Define Test Name</span>
              <input type='text' value={this.state.testName} name='testName' onChange={this.changeHandler} placeholder='Test Name' />
              <input type='text' value={this.state.normalRange} name='normalRange' onChange={this.changeHandler} placeholder='Normal Range' />
              <br/>
              <button style={{padding:'10px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:'pink'}} onClick={this.saveTestName} >Save</button>



{/* Code to get list of all opened sub head names */}
<br/><br/><br/><br/>
              <span style={{fontSize:'19px',color:'brown'}}>List of Test Names</span><br/>
              <button style={{padding:'6px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.getSubTestNameList}> {this.state.showTestNameListStatus === false ? 'Get List' : 'Hide List'} </button>
              <div className={this.state.showTestNameListStatus === false ? 'display' : ''}>
              <table><thead><tr><th>Test Name</th><th>Range</th></tr></thead><tbody>{this.state.testNameListObjects.map(  (item,index)=>{return <tr key={index}><td>{(index+1) + '- ' + item.testName}</td><td>{item.normalRange}</td><td><a href='#' className="material-icons" style={{color:'green',fontSize:'15px'}} onClick={()=> this.editTestName(index)}>edit</a></td></tr>})    }</tbody></table> 

              </div>



{/* {this.state.testNameListObjects.map((ob,i)=>{return <p>{ob.testName}</p>})} */}
            


              </div>
</div>


            
            
        )
    }


  }

export default Define;