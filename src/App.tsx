import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "./graphql/queries";

function App() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
