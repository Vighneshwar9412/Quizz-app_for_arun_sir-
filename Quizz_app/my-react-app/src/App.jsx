import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 7);
    setChapter(randomNumber);

    // Fetch questions for the selected chapter
    axios.get('http://localhost:5000/quiz-questions')
      .then(response => {
        console.log(response.data)
        setQuestions(response.data || []); 
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
    
    // Format answers for submission
    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      user_id: 'student123', // Replace with actual user ID if available
      question_id: questionId,
      answer,
    }));

    axios.post('http://localhost:5000/submit-answers', formattedAnswers)
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

      {submitted && <p>Your answers have been submitted! We will update you about your score.</p>}
    </div>
  );
};

export default QuizPage;
