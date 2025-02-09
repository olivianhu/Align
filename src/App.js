import './App.css';
import { useState } from 'react'
import Axios from 'axios'

export default function App() {

    function sendMessage() {
        Axios.get('http://localhost:5000/')
        .then(function (response) {
            console.log('response successfully received, response below')
            console.log(response)

            //set message to be response we get from backend
            setMessage(response.data);
        }).catch(function (error) {
            console.log('response unsuccessfully received, error below')
            console.log(error)
        }).finally(function (){
            console.log("This part is always executed no matter what")
        }) 

    }

    const [message, setMessage] = useState("No Current Message")
    
    return (
        <div className='container'>
            <p>{message}</p>
            <button
            onClick={() => {sendMessage()}}
            >Send Message</button>
        </div>
    )
}
