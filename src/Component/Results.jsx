import React from 'react'
import { useNavigate } from 'react-router-dom'
import Image from '../Images/imgavatar.png'
function Results() {

  const navigate = useNavigate('')

  function handleRestart() {
    localStorage.removeItem('Score')
    localStorage.removeItem('Correct')
    localStorage.removeItem('Incorrect')
    navigate('/')
  }


  return (

      <div className='result-container'>
          <h1>Your Results</h1>
      <h3 className='result'>Your Score: {
      localStorage.getItem('Score') 
      }% out of 100% </h3>
      <h3 className='result'>Correct Answers: {localStorage.getItem('Correct')}</h3>
      <h3 className='result'>InCorrect Answers: {localStorage.getItem('Incorrect')}</h3>

      <button onClick={handleRestart} className='result'>Restart Quiz</button>
    </div>
    
  )
}

export default Results