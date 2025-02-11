import './App.css';
import { useState } from 'react'
import Axios from 'axios';
import Login from './components/Login';
import CreationPage from './components/CreationPage';

export default function App() {

    // function sendMessage() {
    //   Axios.get('http://localhost:5000/')
    //   .then(function (response) {
    //     console.log('response successfully received, response below')
    //     console.log(response)

    //     setMessage(response.data);
    //   }).catch(function (error) {
    //       console.log('response unsuccessfully received, error below')
    //       console.log(error)
    //   })
    // }

    // const [message, setMessage] = useState("No Current Message")
    const [showLogin, setShowLogin] = useState(false)
    
    return (
        <div className='p-10'>
            {showLogin ? <Login /> : <CreationPage />}
            {/* <p>{message}</p>
            <button
            onClick={() => {sendMessage()}}
            >Send Message</button> */}
        </div>
    )
}