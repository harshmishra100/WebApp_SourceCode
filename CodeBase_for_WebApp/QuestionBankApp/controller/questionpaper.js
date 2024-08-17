const { Question } = require('../db/models'); // Assuming your Question model is exported correctly


const getFilteredQuestions = async (req, res) => {
    try {
      const { difficulty, bloom_taxonomy, grade, subject, type, topic } = req.query;
      const query = {};
  
      // Dynamically add fields to the query object if they are provided in the request body
      if (difficulty) query.difficulty = difficulty;
      if (bloom_taxonomy) query.bloom_taxonomy = bloom_taxonomy;
      if (grade) query.grade = grade;
      if (subject) query.subject = subject;
      if (type) query.type = type;
      if (topic) query.topic = topic;
  
      // Fetch questions based on the constructed query
      const questions = await Question.findAll({ where: query });
      
      // Send the fetched questions in the response
      res.status(200).json(questions);
    } catch (error) {
      // Send an error response in case of an error
      res.status(500).json({ error: error.message });
    }
  };


// Update a question by ID

module.exports = {
  getFilteredQuestions 
};
