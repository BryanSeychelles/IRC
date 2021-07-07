import { useEffect, useState } from 'react';
import {TextField, FormControl} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
const endpoint = "http://localhost:1337";

var currChan = "#welcome"

function channel(params) {
    var params = document.getElementById("params")
    var channel = document.getElementById("channel")

    channel.style.display='block'
    params.style.display = 'none'

    anime()
}

function anime() {
    var sidebar = document.getElementById("sidebar")
    var contain = document.getElementById("contain")
    var times = document.getElementById("times")
    var bars = document.getElementById("bars")
    var channel = document.getElementById("channel")


        sidebar.animate([
            // keyframes
            { marginLeft: '-28%' }, 
            { marginLeft: '-5%' }
          ], { 
            // timing options
            duration: 100,
          });
          sidebar.style.marginLeft = '-5%'
          contain.style.display = 'block'
          times.style.display = 'block'
          bars.style.display = 'none'
          document.documentElement.style.overflow = 'hidden'
}

class Forms extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            message:'',
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
        const {message} = this.state

        const data = {msg : message}
        axios.post('http://localhost:1337/send', data, {withCredentials: true})
        .then(response => {
	    if ((data.msg).startsWith("/show") ) {

		var split = (data.msg).split(" ")
		if (split[1] !== undefined)
		    currChan = split[1]
                var element = document.getElementById('list')
		var firstElem = element.firstChild
		var newElem = firstElem.cloneNode(false)
		for (var i = 0; i < (response.data).length; i++) {

		    var currElem = element.childNodes[i]
		    var fullMsg = response.data[i].sender + " : " + response.data[i].message
		    if (currElem === undefined) {
			newElem.innerText = fullMsg
			element.appendChild(newElem)
		    }
		    currElem.innerText = fullMsg
		    currElem.style.display = "block"
		}
		var dataLen = (response.data).length
		var elemLen = (element.childNodes).length
		if (dataLen < elemLen)
		    for (var j = dataLen; j < elemLen; j++)
			element.childNodes[j].style.display = "none"
		console.log(element)
	    }
            this.setState({
                message:'',
            })
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })    
    }
    render() {

        const {message} = this.state

       return (
            <form onSubmit={this.handleSubmit}>
                <FormControl>
                    <TextField
                        id="standard-textarea"
                        label="Message"
                        placeholder="tape your message"
                        id='message'
                        name='message'
                        value={message}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <button id="send" className='btn btn-primary'>Send</button>
            </form>
        )
    }
}

export const Chat = () => {

    const [data, setData]= useState([]);

    useEffect(() => {
        const fetchData = async () => {
		const result = await axios.post('http://localhost:1337/send', {msg: "/show " + currChan}, {withCredentials: true})
		setData(result.data)
        }
	fetchData()
	const socket = socketIOClient(endpoint)
	socket.on("chatodesu", msg => {

	    if (msg.sender === undefined) {
		var mesgCache = msg;
		msg = {}
		msg.sender = "Server";
		msg.message = mesgCache;
	    }
	    data.push(msg)
	    setData(data)
	    fetchData()
	});
    }, [])
    
    return(
        <section style={{marginLeft: '7%', backgroundColor: 'rgba(193, 191, 189, 0.523)'}}>
            <div id="chat">
                <div>
                    <ul id='list' className="list-group">
                        {data.map(item => (
                            <li className="list-group-item">
                                <div>
                                {item.sender} : {item.message}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Forms/>
        </section>
    )
}
