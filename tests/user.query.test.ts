const axios = require('axios');
// const URL = 'http://localhost:4040/graphql';

function userQuery() {
  describe('Category resolvers work as intended', () => {
    console.log(process.env.Authorization, 'process.env.Authorization');
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

module.export = userQuery();
