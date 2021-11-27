import react, {Component} from 'react'
import '../App.css';
// import {Link, Route,BrowserRouter} from 'react-router-dom'
import firebase from './Fire'
// import App from '../App'



//This Component is made to show the all App you made
class CustomerAccess extends Component{
    constructor(){
        super();
        this.state ={
            
            
        }

    }


    componentDidMount(){

      
  
    }



    changeHandler= (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }








    render(){
        return(
        <div>
Customer Access


        </div>
        )
    }
}

export default CustomerAccess;


