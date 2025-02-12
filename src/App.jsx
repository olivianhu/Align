import './App.css';
import { useState } from 'react'
import Login from './components/Login';
import CreationPage from './components/CreationPage';

export default function App() {

    const [showLogin, setShowLogin] = useState(false)

    const toggleLogin = () => {
      setShowLogin(!showLogin);
    }
    
    return (
        <div className='p-10'>
          <button 
            className='border border-gray-400 rounded-md px-2 py-1 mb-4 text-white'
            onClick={toggleLogin}
            >
            Login
          </button>

          {showLogin ? <Login /> : <CreationPage />}
        </div>
    )
}