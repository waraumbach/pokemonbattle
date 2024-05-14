import { useNavigate } from 'react-router-dom'
import './App.css'
import Fight from './components/Fight'
import { useState, } from 'react'


function App() {
  let navigate = useNavigate()

  return (
    <div>

      <h1>This is my Pokemon Application</h1>
      <button onClick={() => navigate('/pokemons')}>Select a Pokemon</button>


    </div>
  )
}

export default App
