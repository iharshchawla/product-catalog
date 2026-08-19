import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { products } from "./data.js";

const typeDefs = /* GraphQL */ `
  type Product {
    id: ID!
    name: String!
    price: Float!
    category: String!
  }

  type Query {
    products(category: String): [Product]
    product(id: ID!): Product
  }
`;

const resolvers = {
  Query: {
    products: (_parent, args) => {
      if (args.category) {
        return products.filter(
          (p) => p.category.toLowerCase() === args.category.toLowerCase(),
        );
      }
      return products;
    },
    product: (_parent, args) => {
      return products.find((p) => p.id === args.id);
    },
  },
};

const schema = createSchema({ typeDefs, resolvers });
const yoga = createYoga({ schema });
const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Mock GraphQL server running at http://localhost:4000/graphql");
});
