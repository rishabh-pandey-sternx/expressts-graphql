const axios = require('axios');
// const URL = 'http://localhost:4040/graphql';

function dummy() {
  describe('Should get the dummy query result', () => {
    test('Test out dummy query', async () => {
      const newSpecification = await axios.post(
        `http://localhost:4040/graphql`,
        {
          query: `{
      dummy(
        name:"Rishabh"
        ) {
          name
          age
          profession
          text
        }
      }`
        }
      );

      const { data } = newSpecification;
      expect(data).toMatchObject({
        data: {
          dummy: {
            name: 'Rishabh',
            age: 23,
            profession: 'Dev',
            text: 'Hello'
          }
        }
      });
    });

    test('test mutation', async () => {
      const mutation = await axios.post(`http://localhost:4040/graphql`, {
        query: `mutation {
        dummyMutation(
          fullname: "Rishabh Pandey", email:"geekrishabh@gmail.com"
          ) {
            name
            age
            profession
            text
          }
        }`
      });
      const { data } = mutation;
      expect(data).toMatchObject({
        data: {
          dummyMutation: {
            name: 'Rishabh Pandey',
            age: 23,
            profession: 'Dev',
            text: 'Hello'
          }
        }
      });
    });
  });
}

module.exports = dummy();
