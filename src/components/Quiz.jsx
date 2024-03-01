import { useState, useCallback } from 'react';

import QUESTIONS from '../../questions.js'
import quizCompleted from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const ANSWERED = 'answered';
    const CORRECTED = 'corrected';
    const WRONG = 'wrong';
    const timeoutTime = 100 * 10 * 10;
    const waitingTimeout = 100 * 10;

    const [answerState,setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex =answerState === "" ? userAnswers.length : userAnswers.length - 1;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectedAnswerCallback = useCallback(function handleSelectedAnswer(selectedAnswer) {
        setAnswerState(ANSWERED);
        setUserAnswers((prev) => {
            console.log("Input:", selectedAnswer);
            console.log("User Answers: ", userAnswers);

            return [...prev, selectedAnswer]
        })

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState(CORRECTED);
            } else {
                setAnswerState(WRONG)
            }

            setTimeout(() => {
                setAnswerState('')
            }, 2000)
        }, waitingTimeout)
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectedAnswerCallback(null), [handleSelectedAnswerCallback]);

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleted} alt="quiz complete"/>
                <h2>Quiz Completed!!!</h2>
            </div>
        )
    }

    const shuffledAnswer = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswer.sort( () => Math.random() - 0.5);
    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeout={timeoutTime}
                    onTimeout={handleSkipAnswer}
                />
                <h2>
                    {QUESTIONS[activeQuestionIndex].text}
                </h2>

                <ul id="answers">
                    {
                        shuffledAnswer
                        .map(answer => {
                            const isSelected = userAnswers[userAnswers.length - 1] === answer
                            let cssClass = '';
                            if (answerState === ANSWERED && isSelected) {
                                cssClass = "selected"
                            }

                            if ((answerState === CORRECTED || answerState === WRONG) && isSelected) {
                                cssClass = answerState;
                            }

                            return <li key={answer} className="answer">
                                <button onClick={() => handleSelectedAnswerCallback(answer)}
                                        className={cssClass}>{answer}</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>

    )
}