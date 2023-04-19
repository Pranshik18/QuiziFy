import React, { useEffect, useState } from "react";
import questionlist from '../questions.json'
import MultiProgress from 'react-multi-progress'
import { useNavigate } from "react-router-dom";
function QuizHome() {
    const [questionindex, setQuestionIndex] = useState(0)
    const [index, setIndex] = useState(1)
    const [score, setScore] = useState(0)
    const [quesindex, setquesIndex] = useState(1)
    const [wrong, setWrong] = useState('')
    const [shuffle, setShuffle] = useState(true)
    const [max, setMax] = useState(100)
    const [show, setShow] = useState(false)
    const [button, setButton] = useState(false)
    const [val, setVal] = useState('')
    const [question, setQuestion] = useState(decodeURI(questionlist[questionindex].question))
    const [category, setCategory] = useState(decodeURI(questionlist[questionindex].category))
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    const navigate = useNavigate('')
    const [shuffledarray , setShuffledArray] = useState([])
   

    //Function to shuffle the array of options
    function shuffling(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    // Function to shuffle the array when the component called 
    function makeShuffledArray(index) {
        let optionarr = [questionlist[index].correct_answer]
        if (shuffle) {
            for (const values of questionlist[index].incorrect_answers) {
                optionarr.push(values) 
            }
            optionarr = shuffling(optionarr)
            console.log(optionarr);
        } 
        return optionarr
    }

    //Using use effect on shuffling to render them only once whenever the question index changes
    useEffect(() => {
        const shuffled = makeShuffledArray(questionindex)
        setShuffledArray(shuffled)
    },[questionindex])

    // ..Functions for difficulty
    const stars = () => {
        if (questionlist[questionindex].difficulty === "hard") {
            return "★★★✰✰";
        }
        else if (questionlist[questionindex].difficulty === "medium") {
            return "★★✰✰✰";
        }
        else {
            return "★✰✰✰✰";
        }
    }

    //Next question Click Functioning
    const handlenextques = () => {
        setQuestionIndex(questionindex + 1)
        setquesIndex(quesindex + 1)
        setCategory(decodeURI(questionlist[quesindex].category))
        setQuestion(questionlist[quesindex].question)
        setShuffle(true)
        setShow(false)
        setVal('')
        setWrong('')
        setButton(false)
        setIndex(index + 1)
    }

    //Checking the right answer
    function handleCheck(val) {
        if (val === decodeURI(questionlist[questionindex].correct_answer)) {
            setShow(true)
            let value = (100 / questionlist.length)
            setScore(score + value)
            setVal("Correct Answer")
            setCorrect(correct + 1)
        }
        else {
            setMax(max - 5)
            setButton(true)
            setWrong(decodeURI(val))
            setShow(true)
            setIncorrect(incorrect+1)
            setVal("Sorry! Please try again")
        }
    }

    //Checking results and storing them to local storage
    function handleResults() {
        localStorage.setItem("Score", score)
        localStorage.setItem("Correct", correct)
        localStorage.setItem("Incorrect", incorrect)
        localStorage.setItem("max",max)
        navigate('/results')
    }


    return (
        <div className="Container">
            <div className="main-div">
                <progress max={questionlist.length} value={quesindex} className='progress'></progress>
                <h2 className="question">Question {questionindex + 1} of {questionlist.length}</h2>
                <p className="main-ques">{category}</p>
                <p className="main-ques">{stars()}</p>
                <p className="main-ques">{decodeURI(question)}</p>
                {
                    shuffledarray.map((item) => {
                        return (
                            <>
                                {val.length > 0 ? <button className='ques'>{decodeURI(item)}</button>
                                    : <button onClick={() => handleCheck(decodeURI(item))} className='ques'>{decodeURI(item)}</button>}
                            </>
                        )
                    })
                    
                }
                
                {show && index<questionlist.length ?
                    <div>
                        <h3 className="answer ">{val}</h3>
                        <button onClick={handlenextques} className='ques'>Next Question</button>
                    </div> :
                    ''}
                {
                    index===questionlist.length && show && <button onClick={handleResults} className='ques'>Show Results</button>
                } 
                <p className="score">Score: {score} <span className="max">Max Score: { max}</span></p>
                <MultiProgress
                    transitionTime={1}
                    elements={[
                        {
                            value: score,
                            color: "black",
                            isBold: false,
                        },
                        {
                            value: max,
                            color: "grey",
                            isBold: true,
                        },
                        {
                            value: 3,
                            color: "darkGrey",
                            isBold: true,
                        },
                        {
                            value: max,
                            color: "lightgrey"
                        },
                    ]}
                    height={30}
                    borderradius={0}

                />   
            </div>
            </div>
        )
}

export default QuizHome;