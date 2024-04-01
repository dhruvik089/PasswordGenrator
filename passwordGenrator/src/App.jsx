import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [charecter, setCharecter] = useState(false)
  const [number, setNumber] = useState(false)
  const [password, setPassword] = useState("")

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (charecter) str += '!@#$%^*()_+~{}[]<>?/.,';
    if (number) str += '1234567890'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }
    , [length, number, charecter])

  const passReference = useRef(null);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    generatePassword();
  }, [length, number, charecter, generatePassword])

  return (
    <>
      <div className=' m-auto main  bg-light '>

        <div className='m-auto '>
          <div className='text-center h2'>Password Genrate</div>
        </div>

        <div className='d-flex flex-wrap second-part'>
          <input type="text" ref={passReference} value={password} onChange={(e) => { setPassword(e.target.value) }} readOnly className='form-control ' />
          <button className='btn bg-info' onClick={copyPassword()}>Copy</button>
        </div>

        <div className='d-flex flex-wrap justify-content-around last-part'>

          <div>
            <input type="range" value={length} min={8} max={100} step={1} onChange={(e) => { setLength(e.target.value) }} />
            <label className='form-label'>length : {length}</label>
          </div>

          <div>
            <input type="checkbox" defaultChecked={number} className='form-check ' onChange={() => { setNumber(!number) }} />
            <label htmlFor="number" className='form-label'>Number</label>
          </div>

          <div>
            <input type="checkbox" defaultChecked={charecter} className='form-check' onChange={() => { setCharecter(!charecter) }} />
            <label htmlFor="number" className='form-label'> Charecter</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
