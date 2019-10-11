const axios = require('axios');
// const URL = 'http://localhost:4040/graphql';

function userQuery() {
  describe('User Query', () => {
    test('Get all users', async () => {
      const foundUsers = await axios.post(
        `http://localhost:4040/graphql`,
        {
          query: `
      {
        getUsers {
          id
          email
          fullname
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

      const { getUsers } = foundUsers.data.data;
      expect(getUsers.length).toBeGreaterThan(0);
    });
  });
}

module.exports = userQuery();
