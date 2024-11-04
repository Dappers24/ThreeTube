import { ApolloClient, InMemoryCache } from '@apollo/client';
import { subgraphUrl } from './constants';

const apolloClient = new ApolloClient({
  uri: subgraphUrl,
  cache: new InMemoryCache(),
});

export default apolloClient;