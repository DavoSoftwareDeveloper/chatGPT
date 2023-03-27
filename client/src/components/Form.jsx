import sendLogo from '../assets/send.svg'

function Form({handleArea, handleSubmit, text }) {
  return (
    <form>
    <textarea onChange={handleArea} value={text} name='text' rows='1' cols='1' placeholder='Ask Codex...'></textarea>
    <button type='submit' onClick={(e)=>handleSubmit(e)}>
      <img src={sendLogo} />
    </button>
  </form>
  )
}

export default Form
