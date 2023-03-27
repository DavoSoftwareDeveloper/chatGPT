import { useState } from 'react'
import Form from './components/Form'
import Chat from './components/Chat'
// import Selection from 'react-selection'

import './App.css'

function App() {

  const [text, setText] = useState('')
  const [conversation, setConversation] = useState([])
  const [dots, setDots] = useState("")

  let interval;
  const loader = () => {
      interval = setInterval(() => {
      if (dots.length === 3) {
        setDots("");
      } else {
        setDots(dots + ".");
      }  
    }, 300);

  }

  const typeText = (element, text) =>{
      let index = 0

      let interval = setInterval(()=>{
          if(index < text.length){
              element += text.charAt(index)
              index++
          } else {
              clearInterval(interval)
          }    
          }, 20)
      }
      
  const generateUniqueId = () => {
      const timestamp = Date.now()
      const randomNumber = Math.random()
      const hexadecimalString = randomNumber.toString(16)

      return `id-${timestamp}-${hexadecimalString}`
  }

  const generateAnswer = async (prompt) =>{

    const response = await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        prompt: prompt
      })
    })

    if(response.ok){
      const data = await response.json()
      const parsedData = data.bot.trim()

      console.log(parsedData)
      clearInterval(interval)
      const bot = {
        isAi: true,
        id: generateUniqueId(),
        text: parsedData
      }
      setConversation(prevState => [...prevState,bot])
    } else {
      const err = await response.text()
      alert(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const human = {
      isAi: false,
      id: generateUniqueId(),
      text: text
    }
    setConversation(prevState => [...prevState,human])
    generateAnswer(human.text)
    setText('')
    loader()
    
  }


  const handleArea = (e) => {
    setText(e.target.value)
  }

  return (
    <div className="App">
            <Chat conversation={conversation} dots={dots}/>
            <br></br>
            <Form handleArea={handleArea} handleSubmit={handleSubmit} text={text} />

    </div>
  )
}

export default App
