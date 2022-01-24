import react, {Component , useRef} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'
import CustomerAccess from './CustomerAccess'
import App from '../App'
import labImg from './image.jpg'
import instruc from './instruc.png'
import {useReactToPrint} from 'react-to-print'




//This Component is made to show the all App you made
class Login extends Component{
    constructor(){
        super();
        this.state ={
                user:null,
                
        }

    }


    componentDidMount(){
        this.authListener();
        

        }
        




        authListener = ()=>{
        firebase.auth().onAuthStateChanged( (user)=>{
            if(user){
                this.setState({user})
                // console.log(user.email)
        
        
            } else {
                this.setState({user:null})
            }
        })
        }









        






    render(){
        return(
        <div>

{this.state.user ? (<App/>) : <LoginForm/>}

        </div>
        )
    }
}

export default Login;





class Headers extends Component{

    render(){
        return(
            <div>
                <div id='div1'> 
                 Medical Lab Portal
                 </div>

                    <div className='container center'>
                    <img src={instruc} alt='Pic here' width='80%'/><br/>
                    </div>
            </div>
        )
    }
}








//THis Component is made to login by the user (it is login form)
class LoginFormDisplay extends Component{
   
    constructor(){
        super();
        this.state ={
                forgetStatus:false,
                forgetEmial:'',
                showLoginPage:false,
                showCustomerReports:false,
                customerReports:[],
                displayReportObject:{patientReport:[]},
                showReport:false


                
        }

    }



componentDidMount(){
       

        var dataPushPromise = new Promise( (res,rej)=>{
            
        
              var list = []
        
            firebase.database().ref('customerReports').on('child_added' , (data)=> { 
              list.push(data.val())
            }  )
        
        
            res(list)
            rej('Operation Failed: Data From Firebase does not push in state successfully')
          } )
          dataPushPromise.then((customerObj)=>{
          
            this.setState({customerReports:customerObj, loadCustomerList:true})
          
          
          })



        }



getReport=()=>{



            this.setState({showReport:true})
                var reportNo = document.getElementById('enterMobileNo').value
                var reqObjPromise = new Promise( (res,rej)=>{
                //   var ourObj = this.state.customerReports.find((obj)=>{return obj.contact === Number(reportNo)})
                  var ourObj = this.state.customerReports.find((obj)=>{return obj.contact === reportNo})
                
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






    



    signin = ()=>{
     const email = document.querySelector('#email').value;
     const password = document.querySelector('#password').value;
 
 
 
     firebase.auth().signInWithEmailAndPassword(email, password)
     .then( (u)=>{
 
         // console.log(u.user.uid)
         // console.log(u)
         
     } )
     .catch( (err)=>{
         alert('Your Password is incorrect or you are not registered.')
         console.log('error')
     } )
 
    } 
 
 



    showForgetField = ()=>{
        this.setState({forgetStatus:true})
    }


    changeHandler = (e)=>{
        this.setState({forgetEmial: e.target.value})

        console.log(this.state.forgetEmial)
    }


    ressetPassword = ()=>{

        firebase.auth().sendPasswordResetEmail(this.state.forgetEmial)
        .then(()=>{
            alert('Please check email and reset your password')
        }).catch((error)=>{
            alert(error)
        })

    }



showLogin = ()=>{
    this.setState({showLoginPage:true, showCustomerReports:false})
}

showCustomerPage=()=>{
    this.setState({showLoginPage:false, showCustomerReports:true})
}


     render(){
         return (
             <div>
 

{/* <div className={this.state.customerPortal === false ? '' : 'display'}> */}




 {/* <div id='div1'> 
      Medical Lab Portal
      </div> */}
      {/* <span style={{fontSize:'12px'}}>{navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span><br/> */}
      

<div className='container center'>
{/* <img src={instruc} alt='Pic here' width='80%'/><br/> */}
    <span className='navLinks_loginPage' onClick={this.showCustomerPage}>Customer Lab Reports</span>
</div>

<span className='navLinks_loginPage' onClick={this.showLogin}>User-Login</span>

                {/* The Div of User Login is Here */}
             <div className={this.state.showLoginPage===false?'display':'container'}>
             {/* <div className="col s12"> */}

               <div className="input-field">
              <input placeholder="Email" id="email" type="text" className="validate" />
              {/* <label forhtml="first_name">First Name</label> */}
               </div>
 
               <div className="input-field">
              <input placeholder="Password" id="password" type="password" className="validate" />
              {/* <label forhtml="first_name">First Name</label> */}
               </div>
 
               <button style={{padding:'10px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:'lightgreen'}} onClick={this.signin}>Login</button>

                <a href='#' onClick={this.showForgetField}>Forget Password ?</a>

<br/><br/><br/>


                <div className={this.state.forgetStatus === false ? 'display' : ''}>
                <p><b style={{color:'green'}}>Pleae enter your email address in below field on which you want to reset your Password</b></p>
                <input type='text' value={this.state.forgetEmial} name='forgetEmail' onChange={this.changeHandler} placeholder='Write Email here' /><br/>
                <button onClick={this.ressetPassword} style={{padding:'10px',fontSize:'18px',borderRadius:'7px', color:'blue', backgroundColor:'lightgreen'}}>Resset</button>
                
                </div>
              {/* </div> */}
              </div>
              





{/* div of customer reports */}
<div className={this.state.showCustomerReports===false?'display':'container'}>


<div>
          <span style={{fontSize:'14px',color:'red'}}>Enter Your 11 digit Mobile Number without dash (03xxxxxxxxx)</span><br/>
          <input type='Number' id='enterMobileNo' placeholder='Enter Mobile Number Here'/> <br/>
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
          </div>

{/* in case record not found */}
        <div className={this.state.showReport===false ?'' : 'display'}>
        <span style={{color:'red', fontSize:'22px'}}><b>{this.state.noRecordFound}</b></span>
        </div>



</div>
<br/><br/>








{/* here from image and other contents is starting */}
{/* <div className='container'>
<img src={labImg} alt='Pic here' width='100%'/>
</div> */}





{/* <hr style={{height:'2px', backgroundColor:'red'}}/>

<br/><br/> */}



{/* Below code is only to show the component of customerAccess */}
{/* <div className='container'>
<BrowserRouter>
<Link to='/CustomerAccess' className='headings' style={{fontSize:'17px', backgroundColor:'lightgray', padding:'10px'}} > <b>Customer Login</b> </Link>
<Route path='/CustomerAccess' component={CustomerAccess}/> 
 </BrowserRouter>
</div> */}
{/* the code of customerAccess is ended here */}





{/* <br/><br/>
<div className='bottomLine'> 

Online Lab Test Report System<br/>
Contact: 0346-7605798 Email: waqas_mba86@yahoo.com
</div> */}

{/* </div> */}




             </div>
         )
     }
 }






 class Content extends Component{

    render(){
        return(
            <div>
                

                    <div className='container'>
                    <img src={labImg} alt='Pic here' width='100%'/>
                    
                    </div>


            </div>
        )
    }
}













 const LoginForm = ()=>{

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: ()=>componentRef.current,
    })
    
      return(
        <div>
            <Headers />
            <LoginFormDisplay ref={componentRef}/>
            <div style={{textAlign:'center'}}><button style={{padding:'5px',fontSize:'14px',borderRadius:'4px', color:'black', backgroundColor:'lightgreen'}} onClick={handlePrint}>Print Report</button></div>
            <br/>
            <Content />
        


        <span style={{fontSize:'12px'}}>{navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span><br/>
        <div className='bottomLine'> 
        Developed By: Waqas Saleem Contact: 0346-7605798 Email: waqas.mba86@gmail.com
        </div>




        </div>
      )
    }