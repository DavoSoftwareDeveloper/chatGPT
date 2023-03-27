import bot from '../assets/bot.svg'
import user from '../assets/user.svg'

function Chat({conversation,dots}) {



  return (
    <div className="chat_container">
    {conversation.map((element,index) => (

<div key={index} className={`wrapper ${element.isAi && 'ai'}`}>
  <div className="chat">
    <div className="profile">
      <img src={element.isAi ? bot : user} alt={element.isAi ? "bot" : "user"} />
    </div>
      <div className='message' id={element.id}>{element.text}</div>
      <div className='message'>{dots}</div>
  </div>
</div>

))}
</div>
  )
}

export default Chat
