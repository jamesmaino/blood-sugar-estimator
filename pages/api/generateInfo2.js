/*
Create a controller with the following specifications:

1. import the Configuration class and the OpenAIApi class from the openai npm module
2. create a new configuration object that includes the api key and uses the Configuration class from the openai module
3. create a new instance of the OpenAIApi class and pass in the configuration object
4. create an async function called generateInfo that accepts a request and response object as parameters
5. use try to make a request to the openai api and return the response
6. use catch to catch any errors and return the error
7. export the generateInfo function as a module
*/

const { Configuration, OpenAIApi } = require("openai");
// import json data from prompt.json file
const { recipePrompt } = require("./prompt.json");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handler = async (req, res) => {
  const { recipe } = req.body;

  res.status(200).json({ message: "Hello from Next.js!" });
};

module.exports = handler;
