const axios = require('axios');
// const URL = 'http://localhost:4040/graphql';

function todoQuery() {
  describe('Todo Query', () => {
    test('Get all todos', async () => {
      const foundTodos = await axios.post(
        `http://localhost:4040/graphql`,
        {
          query: `
      {
        todos {
         title
         completed
         owner_id
        }
      }`
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: process.env.Authorization
          }
        }
      );

      const { todos } = foundTodos.data.data;
      expect(todos.length).toBeGreaterThan(0);
    });

    test('Get all personal todos', async () => {
      const foundTodos = await axios.post(
        `http://localhost:4040/graphql`,
        {
          query: `
      {
        personalTodos {
         title
         completed
         owner_id
        }
      }`
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: process.env.Authorization
          }
        }
      );
      const { personalTodos } = foundTodos.data.data;
      expect(personalTodos.length).toBeGreaterThan(0);
    });
  });
}

module.exports = todoQuery();
