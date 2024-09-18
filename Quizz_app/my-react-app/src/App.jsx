// QuizPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    // Generate a random number between 0 and 6
    var randomNumber = Math.floor(Math.random() * 7);
    setChapter(randomNumber);

    // Fetch questions from the backend API
    axios.get('http://localhost:5000/quiz-questions')
      .then(response => {
        setQuestions(response.data[randomNumber]);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleChange = (e, questionId) => {
    setAnswers({
      ...answers,
      [questionId]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/submit-answers', answers)
      .then(response => {
        console.log('Server response:', response.data);
        setSubmitted(true);
      })
      .catch(error => {
        console.error('Error submitting answers:', error);
      });
  };

  return (
    <div className='Container'>
      <h1>Quiz of Chapter Number {chapter + 1}</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => {
          switch (question.type) {
            case 'mcq':
              return (
                <div key={question.id}>
                  <h2>{index + 1}) {question.text}</h2>
                  {question.options.map((option, i) => (
                    <label key={i}>
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        onChange={(e) => handleChange(e, question.id)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              );
            case 'fill-in-the-blank':
              return (
                <div key={question.id}>
                  <h2>{index + 1}) {question.text}</h2>
                  <input
                    type="text"
                    onChange={(e) => handleChange(e, question.id)}
                  />
                </div>
              );
            case 'description':
              return (
                <div key={question.id}>
                  <h2>{index + 1}) {question.text}</h2>
                  <textarea
                    onChange={(e) => handleChange(e, question.id)}
                  ></textarea>
                </div>
              );
            default:
              return null;
          }
        })}

        <button type="submit">Submit</button>
      </form>

      {submitted && <p>Your answers have been submitted! We will update you about the score you got.</p>}
    </div>
  );
};

export default QuizPage;
