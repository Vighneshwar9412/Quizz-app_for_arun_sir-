// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const path = require("path");
// Middleware
app.use(cors());
app.use(express.json());

// Sample questions
const questions = [
 [ {
    id: 'q1',
    type: 'mcq',
    text: 'What is the capital of France?',
    options: ['Paris', 'London', 'Rome', 'Berlin']
  },
  {
    id: 'q2',
    type: 'mcq',
    text: 'Which of the following is a JavaScript framework?',
    options: ['React', 'Laravel', 'Django', 'Spring']
  },
  {
    id: 'q3',
    type: 'fill-in-the-blank',
    text: 'The largest ocean on Earth is the ____ ocean.'
  },
  {
    id: 'q4',
    type: 'description',
    text: 'Describe the impact of private  pools on india .'
  }],[{
    "id": "q5",
    "type": "mcq",
    "text": "Which planet is known as the Red Planet?",
    "options": ["Mars", "Venus", "Jupiter", "Saturn"]
  },
  {
    "id": "q6",
    "type": "mcq",
    "text": "Who wrote 'To Kill a Mockingbird'?",
    "options": ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"]
  }, {
    "id": "q11",
    "type": "fill-in-the-blank",
    "text": "The longest river in the world is the ____ River."
  },
  {
    "id": "q12",
    "type": "description",
    "text": "Discuss the impact of climate change on polar ice caps."
  }], [
    {
      "id": "q13",
      "type": "mcq",
      "text": "Which country is known as the Land of the Rising Sun?",
      "options": ["Japan", "China", "Thailand", "South Korea"]
    },
    {
      "id": "q14",
      "type": "mcq",
      "text": "What is the chemical symbol for gold?",
      "options": ["Au", "Ag", "Pb", "Fe"]
    },
    {
      "id": "q15",
      "type": "fill-in-the-blank",
      "text": "The Great Pyramid of Giza is located in ____."
    },
    {
      "id": "q16",
      "type": "description",
      "text": "Explain the role of the Internet in modern communication."
    }
  ],
  [
    {
      "id": "q17",
      "type": "mcq",
      "text": "What is the smallest prime number?",
      "options": ["2", "1", "3", "5"]
    },
    {
      "id": "q18",
      "type": "mcq",
      "text": "Which artist painted the Mona Lisa?",
      "options": ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
      "id": "q19",
      "type": "fill-in-the-blank",
      "text": "The process by which plants make their food is called ____."
    },
    {
      "id": "q20",
      "type": "description",
      "text": "Analyze the effects of social media on youth culture."
    }
  ], [
    {
      "id": "q21",
      "type": "mcq",
      "text": "What is the smallest planet in our solar system?",
      "options": ["Mercury", "Mars", "Venus", "Earth"]
    },
    {
      "id": "q22",
      "type": "mcq",
      "text": "Who is known as the Father of Physics?",
      "options": ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"]
    },
    {
      "id": "q23",
      "type": "fill-in-the-blank",
      "text": "The currency used in Japan is the ____."
    },
    {
      "id": "q24",
      "type": "description",
      "text": "Describe the significance of the Space Race during the Cold War."
    }
  ],
  [
    {
      "id": "q25",
      "type": "mcq",
      "text": "Which novel begins with the line 'Call me Ishmael'?",
      "options": ["Moby Dick", "Pride and Prejudice", "1984", "The Great Gatsby"]
    },
    {
      "id": "q26",
      "type": "mcq",
      "text": "What is the capital city of Australia?",
      "options": ["Canberra", "Sydney", "Melbourne", "Brisbane"]
    },
    {
      "id": "q27",
      "type": "fill-in-the-blank",
      "text": "The human body has ____ pairs of chromosomes."
    },
    {
      "id": "q28",
      "type": "description",
      "text": "Explain the impact of renewable energy sources on global economies."
    }
  ],
  [
    {
      "id": "q29",
      "type": "mcq",
      "text": "Which famous scientist developed the theory of relativity?",
      "options": ["Albert Einstein", "Isaac Newton", "Stephen Hawking", "Michael Faraday"]
    },
    {
      "id": "q30",
      "type": "mcq",
      "text": "What is the largest planet in our solar system?",
      "options": ["Jupiter", "Saturn", "Uranus", "Neptune"]
    },
    {
      "id": "q31",
      "type": "fill-in-the-blank",
      "text": "The chemical formula for water is ____."
    },
    {
      "id": "q32",
      "type": "description",
      "text": "Discuss the influence of globalization on cultural diversity."
    }
  ]
];

// Routes
app.get('/quiz-questions', (req, res) => {
  res.json(questions);
});

app.get("/", (req,res)=>{
  app.use(express.static(path.resolve(__dirname, "my-react-app", "build")));
  res.sendFile(path.resolve(__dirname,"my-react-app","dist","index.html"));
});


//---------------------------/
const fs = require('fs');
//const path = require('path');

// Endpoint to accept answers from the frontend
app.post('/submit-answers', (req, res) => {
  const userAnswers = req.body;

  // Log the received answers
  console.log('Received answers:', userAnswers);

  // Define the file path
  const filePath = path.join(__dirname, 'answer.txt');

  // Convert user answers to a string format
  const dataToWrite = "These answer's are submitted by Student "+ JSON.stringify(userAnswers, null, 2) + '\n';

  // Write the data to the file
  fs.appendFile(filePath, dataToWrite, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ message: 'Error saving answers.' });
    }

    res.status(200).json({ message: 'Answers received successfully!' });
  });
});

// Endpoint to accept answers from the frontend
app.post('/submit-answerss', (req, res) => {
  const userAnswers = req.body;

  // For now, just Consoloe.log the answers and send a response
  console.log('Received answers:', userAnswers);
// writing answer to txt file 
  //var fs = require("fs");
  //fs.writeFile('answer.txt',"hello");


  res.status(200).json({ message: 'Answers received successfully!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
