import { InputLabel, FormHelperText, FormControl, Input, Button,} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import axios from 'axios';


function move(e) {
    var earth = document.getElementById('placement');
    var title = document.getElementById('title');
    var inputUser = document.getElementById('inputUser');

    earth.animate([
        // keyframes
        { // to
            marginLeft: "-75%",
            marginTop: "5%"
        }
      ], {
        // timing options
        duration: 1000,
        iterations: 1
      });

      earth.style.marginLeft = "-75%"
      earth.style.marginTop = "5%"
      earth.style.overflow = 'hidden'

      title.style.display = "block";
       title.animate([
        // keyframes
          { // from
            opacity: "0",
          },
          { // to
            opacity: "1",
          }
      ], {
        // timing options
        duration: 1000,
        iterations: 1
      });

      inputUser.style.display = "block";
      inputUser.animate([
        // keyframes
          { // from
            opacity: "0",
          },
          { // to
            opacity: "1",
          }
      ], {
        // timing options
        duration: 1000,
        iterations: 1
      }); 
      e.stopPropagation();
}


class Forms extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            Username:'',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();   
        const {Username} = this.state

        const data = {user : Username}
        axios.post('http://localhost:1337/user', data, {withCredentials: true})
        .then(response => {
            this.setState({
                Username:'',
            })
            document.location.href ='http://localhost:3000/chatroom'
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })    
    }
    render() {

        const {Username} = this.state

       return (
            <form onSubmit={this.handleSubmit}>
                <FormControl id="inputUser">
                    <InputLabel htmlFor="Username">Username</InputLabel>
                        <Input type="text" id='Username' name='Username' value={Username} onChange={this.handleChange} variant="filled" aria-describedby="my-helper-text" />
                        <Button className='btn btn-primary'>
                        <FontAwesomeIcon icon="check"/>
                        </Button>
                    <FormHelperText id="my-helper-text">We'll never share your Username.</FormHelperText>
                </FormControl>
            </form>
        )
    }
}

export const PageHome = () => {
   return (
    <section id="indexBcc" >
        <div>
            <h1 id="title">
                Welcome to JSF- IRC, <br/>
                Pleasant discussion on <br/>
                our platforms and channels
            </h1>
        </div>
            <Forms/>
        <div id="placement" onScroll={move}>
            <div id="earth">
                <svg height="700" width="700">
                    <circle id="circle1" cx="360" cy="220" r="310" /> 
                    <circle id="circle2" cx="360" cy="220" r="310" />
                    <circle id="circle3" cx="600" cy="150" r="310" /> 
                </svg>
            </div>
         </div>
    </section>
    )
}
