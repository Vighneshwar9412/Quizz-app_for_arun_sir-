const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = 'mongodb+srv://asdfggjkl736:Mishra%40123@cluster0.9ylv2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoDB client
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to MongoDB Atlas.');

    const database = client.db('quizDB');
    const questionsCollection = database.collection('questions');
    const responsesCollection = database.collection('user_responses');
    const ansersCollection = database.collection('correctAnswer');
    let correctAnswer = [] ;
    // Endpoint to Get the Marks 
    
    
    app.get('/quiz-answers', async (req,res)=>{
      try{

       
       // const questions = await responsesCollection
        



      }catch(error){
        console.error('Error fetching answer:', error);
        res.status(500).json({ message: 'Error fetching Marks' });
      }
    })

 

   // Endpoint to retrieve questions from the database
   app.get('/quiz-questions', async (req, res) => {
    try {
      const questions = await questionsCollection.find({}).toArray();
      
      const chapters = [];
      let randomNum = Math.floor(Math.random()*20);
      console.log(randomNum)
      for(let i=0 ;i<4 ;i++){
        chapters.push(questions[randomNum+i]);
      }
      //console.log(questions)
      //console.log(chapters)
      res.json(chapters); 
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ message: 'Error fetching questions' });
    }
  });


    // Endpoint to accept answers from the frontend
    app.post('/submit-answers', async (req, res) => {
      const userAnswers = req.body;


      // Log the received answers
      console.log('Received answers:', userAnswers);

      // matching the answer Recived
      const Score = async function score(user_Responses){
       try{
        const answers  = await ansersCollection.find({}).toArray();

        //console.log(answers)

       
        const questionId = [] ;
        
        

        user_Responses.map((item)=>(questionId.push(item.question_id)));
        
        //console.log(questionId)  //

        questionId.forEach((itema)=>{correctAnswer.push(answers.find(item => item.question_id === itema));})
       
        console.log("correct answers", correctAnswer)
      }catch(error){
        console.log(error)
       }

      }
      Score(userAnswers);
      // Save responses to the database
      const result = await responsesCollection.insertMany(userAnswers.map(answer => ({
        user_id: answer.user_id,
        question_id: answer.question_id,
        answer: answer.answer,
      })));

      // Log to file
      const filePath = path.join(__dirname, 'answer.txt');
      const dataToWrite = `These answers are submitted by Student ${JSON.stringify(userAnswers, null, 2)}\n`;

      // Write the data to the answer.txt file
      fs.appendFile(filePath, dataToWrite, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          return res.status(500).json({ message: 'Error saving answers to file.' });
        }
      });

      res.status(200).json({ message: `Answers saved successfully to the database!`, result, correctAnswer });
       
      correctAnswer = [] ;
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run().catch(console.error);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
