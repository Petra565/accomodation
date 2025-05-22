import { useState } from 'react'
import './App.css'
import MainTableComponent from './Components/MainTableComponents/MainTableComponent.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <MainTableComponent></MainTableComponent>
    </>
  )
}

export default App
