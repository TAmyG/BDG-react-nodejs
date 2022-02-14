const { ApolloServer, gql } = require("apollo-server");

// Un schema puede tener el atributo query o mutation
const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    greeting: String
    bye(id: ID): String
  }
`;

// Debe ser una funcion que resuelva al atributo
const resolvers = {
  Query: {
    greeting: () => "Hello world from GraphQL!",
    bye: (root, data) => {
      console.log(root, data);
      return `Bye from GraphQL: ${data.id}`;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen({ port: 9000 })
  .then(({ url }) => console.log(`Server running at ${url}`));
