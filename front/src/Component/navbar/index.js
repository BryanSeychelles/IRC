import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

function params(params) {
    var params = document.getElementById("params")
    var channel = document.getElementById("channel")

    params.style.display='block'
    channel.style.display = 'none'

    anime()
}

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

function close() {
    var sidebar = document.getElementById("sidebar")
    var contain = document.getElementById("contain")
    var times = document.getElementById("times")
    var bars = document.getElementById("bars")

    sidebar.animate([
        // keyframes
        { marginLeft: '-28%' }, 
        { marginLeft: '-5%' }
      ], { 
        // timing options
        duration: 1000,
        direction: 'reverse'
      });

      sidebar.style.marginLeft = '-28%'
      contain.style.display = 'none'
      bars.style.display = 'block'
      times.style.display = 'none'
      document.documentElement.style.overflow = 'scroll'
    }

    function showChannel(e) {
        var name = e.target.name
        axios.post('http://localhost:1337/send', { msg: "/show " + name }, {withCredentials: true})
        .then(response => {
            console.log(response.data)
        })
    }

export const Menu = () => {

    const [data, setData]= useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const privates = await axios.post('http://localhost:1337/send', {msg: "/priv"}, {withCredentials: true})
	    const channels = await axios.post('http://localhost:1337/send', {msg: "/list"}, {withCredentials: true})
	    var both = (privates.data).concat(channels.data)
            setData(both)
        }
    	// fetchData()
    }, [])

    return(
            <section id="containNavbar">
                <Navbar bg="light" expand="lg">
                    <div id="buttonAnime">
                        <Navbar.Brand href="#">
                            <FontAwesomeIcon id="bars" icon="bars" onClick={anime}/>
                            <FontAwesomeIcon id="times" icon="times" onClick={close}/>
                        </Navbar.Brand>
                    </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Navbar>                   
                <div id="sidebar" className="container">
                    <div className='row'>
                        <div className='col-10'>
                            <ListGroup id='channel'>
                                {data.map(item => (
                                    <ListGroup.Item onClick={showChannel} name={item.name} action variant="secondary">
                                        <h4>{item.name}</h4>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <ListGroup id='params'>
                                    <ListGroup.Item variant="primary">
                                        Paramètres
                                    </ListGroup.Item>
                            </ListGroup>
                        </div>
                        <div className='col-2'>
                            <div id='forIcons'>
                            <button type="button" className="btn btn-light" id='btn' onClick={params}>
                                <FontAwesomeIcon id="icons" icon="wrench"/>
                            </button>
                                    <br/>
                            <button type="button" className="btn btn-light" id='btn' onClick={channel}>
                                <FontAwesomeIcon id="icons" icon="comments"/>
                            </button>                            
                        </div>
                        </div>
                    </div>
                </div>
                <div id='contain' onClick={close}></div>
            </section>
    )
}
