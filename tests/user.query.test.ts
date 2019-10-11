const axios = require('axios');
// const URL = 'http://localhost:4040/graphql';

describe('Category resolvers work as intended', () => {
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
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtzZGFkYWpiQGtoLmFzZGtzc24iLCJwYXNzd29yZCI6Imd5dXlsbiIsImlkIjoiNWQ5ZjM2M2I4OTQyMGFiZDNmMWZlZWEyIiwiaWF0IjoxNTcwNzgwNzg4LCJleHAiOjE1NzA4NjcxODh9.oI82QwUAnAXVm0VS1BvSxHDct6r0r4hcBlUT95r0Jfs'
        }
      }
    );

    const { getUsers } = foundUsers.data.data;
    expect(getUsers.length).toBeGreaterThan(0);
  });
});
