const { generateInfo } = require('../pages/api/generateInfo');
const { Configuration, OpenAIApi } = require('openai');
const { recipePrompt } = require('../pages/api/prompt.json');

jest.mock('openai');

describe('generateInfo', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        recipe: 'chocolate cake',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return recipe information', async () => {
    const response = 'This is a recipe for chocolate cake.';
    const completion = {
      data: {
        choices: [
          {
            message: {
              content: response,
            },
          },
        ],
      },
    };
    OpenAIApi.prototype.createChatCompletion.mockResolvedValueOnce(completion);

    await generateInfo(req, res);

    expect(OpenAIApi.prototype.createChatCompletion).toHaveBeenCalledWith({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `${recipePrompt}${req.body.recipe}` }],
      max_tokens: 200,
      temperature: 0,
      n: 1,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: response,
    });
  });

  it('should handle invalid API key error', async () => {
    const error = {
      response: {
        status: 401,
      },
    };
    OpenAIApi.prototype.createChatCompletion.mockRejectedValueOnce(error);

    await generateInfo(req, res);

    expect(OpenAIApi.prototype.createChatCompletion).toHaveBeenCalledWith({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `${recipePrompt}${req.body.recipe}` }],
      max_tokens: 200,
      temperature: 0,
      n: 1,
    });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Please provide a valid API key.',
    });
  });

  it('should handle other errors', async () => {
    const error = new Error('An error occurred.');
    OpenAIApi.prototype.createChatCompletion.mockRejectedValueOnce(error);

    await generateInfo(req, res);

    expect(OpenAIApi.prototype.createChatCompletion).toHaveBeenCalledWith({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `${recipePrompt}${req.body.recipe}` }],
      max_tokens: 200,
      temperature: 0,
      n: 1,
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'An error occurred while generating recipe information. Please try again later.',
    });
  });
});