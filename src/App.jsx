import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
