const axios = require('axios');
// const URL = 'http://localhost:4040/graphql';

function userMutation() {
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
      process.env.Authorization = `Bearer ${data.data['signUp']['token']}`;
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
      console.log(process.env.Authorization, 'process.env.Authorization');
      const updateProfile = await axios.post(
        `http://localhost:4040/graphql`,
        {
          query: `mutation {
          updateProfile(
          user:{fullname: "Geek Rishabh", email:"geekrishabh@gmail.com", password:"Password@07", deviceId: "Testing"}
          ) {
            fullname
            deviceId
            email
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
      const { data } = updateProfile;
      expect(data).toMatchObject({
        data: {
          updateProfile: {
            email: 'geekrishabh@gmail.com',
            deviceId: null,
            fullname: 'Rishabh Pandey'
          }
        }
      });
    });
  });
}

module.exports = userMutation();
