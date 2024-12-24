// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'https://backendpwa-l3am.onrender.com/api',
//   cache: new InMemoryCache(),
// });

// export default client;


import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to your GraphQL API
const httpLink = createHttpLink({
  uri: 'https://backendpwa-l3am.onrender.com/api',
});

// Set up the context for Authorization
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : '',
    },
  };
});

// Create Apollo Client with both links (authLink + httpLink)
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
