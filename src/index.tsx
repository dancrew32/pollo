import React from "react";
import { render } from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const BOOKS = gql`
  query GetBooks($limit: Int!, $offset: Int) {
    books(limit: $limit, offset: $offset) {
      name
      author
    }
  }
`;

function Books() {
  const { loading, error, data } = useQuery(BOOKS, {
    variables: { limit: 10 },
  });

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error books :(</p>;
  return data.books.map(
    (book: { name: string; author: string }, index: number) => (
      <div key={`${book.name}:${book.author}:${index}`}>
        {book.name}: {book.author}
      </div>
    )
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <div>Apollo</div>
        <Books />
      </div>
    </ApolloProvider>
  );
}
render(<App />, document.getElementById("root"));
