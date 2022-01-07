import react, {Component} from 'react'
import '../App.css';
import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'
import CustomerAccess from './CustomerAccess'
import App from '../App'
import labImg from './image.jpg'


//This Component is made to show the all App you made
class Login extends Component{
    constructor(){
        super();
        this.state ={
                user:null
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









//THis Component is made to login by the user (it is login form)
class LoginForm extends Component{
   
    constructor(){
        super();
        this.state ={
                forgetStatus:false,
                forgetEmial:'',
                showLoginPage:false,
                showCustomerReports:false
                // customerPortal:false


                
        }

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




 <div id='div1'> 
      Medical Lab Portal
      </div>
      <span style={{fontSize:'12px'}}>{navigator.onLine===true ? <span style={{color:'green'}}>You are online</span> : <span style={{color:'red'}}>You are OffLine</span>}</span><br/>
      <span className='navLinks_loginPage' onClick={this.showLogin}>User-Login</span>
<br/><br/>

<div className='container center'>
    <span className='navLinks_loginPage' onClick={this.showCustomerPage}>Customer Lab Reports</span>
</div>

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
Customer Reports
</div>
<br/><br/>
<div className='container'>
<img src={labImg} alt='Pic here' width='100%'/>
</div>





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





<br/><br/>
<div className='bottomLine'> 

Online Lab Test Report System<br/>
Contact: 0346-7605798 Email: waqas_mba86@yahoo.com
</div>

{/* </div> */}




             </div>
         )
     }
 }

