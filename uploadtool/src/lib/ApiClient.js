import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import settings  from './Settings';
import fetch from 'node-fetch';
import { from } from 'apollo-link';

const link = new HttpLink({
    uri: 'http://localhost:3000/graphql',
    fetch
})

const authLink = setContext((_, { headers }) => {
    var token = settings.get('token');
    return {
              headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const client =   new ApolloClient({
    ssrMode: true,
    link:from([authLink, link]),
    cache: new InMemoryCache(),
});

export default client;