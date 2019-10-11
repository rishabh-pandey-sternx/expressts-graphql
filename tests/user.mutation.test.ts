const axios = require('axios');
// const URL = 'http://localhost:4040/graphql';

describe('Signup new user', () => {
  test('Create a new user if Not present', async () => {
    const newUser = await axios.post(`http://localhost:4040/graphql`, {
      query: `mutation {
        signUp(
          user:{fullname: "Rishabh Pandey", email:"geekrishabh@gmail.com", password:"Password@07"}
          ) {
            fullname
            token
            email
          }
        }`
    });
    const { data } = newUser;
    expect(data).toMatchObject({
      data: {
        signUp: {
          fullname: 'Rishabh Pandey',
          email: 'geekrishabh@gmail.com'
        }
      }
    });
  });

  test('Login User', async () => {
    const newUser = await axios.post(`http://localhost:4040/graphql`, {
      query: `mutation {
        login(
          email:"geekrishabh@gmail.com", password:"Password@07"
          ) {
            fullname
            token
            email
          }
        }`
    });
    const { data } = newUser;
    expect(data).toMatchObject({
      data: {
        login: {
          fullname: 'Rishabh Pandey',
          email: 'geekrishabh@gmail.com'
        }
      }
    });
  });

  test('Update user profile', async () => {
    const updateProfile = await axios.post(
      `http://localhost:4040/graphql`,
      {
        query: `mutation {
        updateProfile(
          user:{fullname: "Geek Rishabh", email:"geekrishabh@gmail.com", password:"Password@07",deviceId:"Testing"}
          ) {
            fullname
            token
            email
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
    const { data } = updateProfile;
    expect(data).toMatchObject({
      data: {
        updateProfile: {
          email: 'geekrishabh@gmail.com',
          deviceId: 'Testing',
          fullname: 'Geek Rishabh'
        }
      }
    });
  });
});
