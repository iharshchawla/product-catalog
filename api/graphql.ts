import { createSchema, createYoga } from "graphql-yoga";

export const config = {
  runtime: "edge",
};

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

const names: Record<string, string[]> = {
  Electronics: [
    "Wireless Mouse",
    "Mechanical Keyboard",
    "Bluetooth Speaker",
    "USB-C Hub",
    "Webcam HD",
    "Noise Cancelling Headphones",
    "Portable SSD",
    "Smart Watch",
    "Wireless Charger",
    "Monitor Stand",
    "HDMI Cable",
    "Laptop Sleeve",
  ],
  Sportswear: [
    "Running Shoes",
    "Yoga Mat",
    "Gym Gloves",
    "Resistance Bands",
    "Water Bottle",
    "Track Jacket",
    "Compression Socks",
    "Foam Roller",
    "Sports Cap",
    "Duffel Bag",
  ],
  "Home Appliances": [
    "Coffee Maker",
    "Blender",
    "Desk Lamp",
    "Air Purifier",
    "Toaster",
    "Electric Kettle",
    "Vacuum Cleaner",
    "Humidifier",
    "Rice Cooker",
    "Iron Press",
  ],
  Accessories: [
    "Backpack",
    "Sunglasses",
    "Leather Wallet",
    "Travel Organizer",
    "Phone Case",
    "Keychain",
    "Wristband",
    "Tote Bag",
    "Belt",
    "Umbrella",
  ],
};

let id = 1;
const products: Product[] = Object.entries(names).flatMap(([category, items]) =>
  items.map((name) => ({
    id: String(id++),
    name,
    price: Math.round((Math.random() * 180 + 15) * 100) / 100,
    category,
  })),
);

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
        ? products.filter(
            (p) => p.category.toLowerCase() === args.category!.toLowerCase(),
          )
        : products,
    product: (_: unknown, args: { id: string }) =>
      products.find((p) => p.id === args.id),
  },
};

const schema = createSchema({ typeDefs, resolvers });

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
});

export default yoga;
