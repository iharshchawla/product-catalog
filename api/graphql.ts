import { createSchema, createYoga } from 'graphql-yoga';
import { products } from './data';

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
        products: (_: unknown, args: { category?: string }) =>
            args.category
                ? products.filter((p) => p.category.toLowerCase() === args.category!.toLowerCase())
                : products,
        product: (_: unknown, args: { id: string }) => products.find((p) => p.id === args.id),
    },
};

const schema = createSchema({ typeDefs, resolvers });

export default createYoga({
    schema,
    graphqlEndpoint: '/api/graphql',
});