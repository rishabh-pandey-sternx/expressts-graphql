const axios = require('axios');
// const URL = 'http://localhost:4040/graphql';

function todoMutation() {
  describe('Todo Operations', () => {
    test('Create a new todo against logged in user', async () => {
      const newTodo = await axios.post(
        `http://localhost:4040/graphql`,
        {
          query: `mutation {
          createTodo(input:{title:"First test", completed:COMPLETED,}
          ) {
            title
            id
            owner_id
            collaborater_ids
            completed
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
      const { data } = newTodo;

      expect(data).toMatchObject({
        data: {
          createTodo: {
            title: 'First test',
            completed: 'COMPLETED'
          }
        }
      });
    });
  });
}

module.exports = todoMutation();
