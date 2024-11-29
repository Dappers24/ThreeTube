import { ApolloClient, InMemoryCache } from '@apollo/client';
import { nftSubgraphUrl } from './constants';

const apolloClientNFT = new ApolloClient({
  uri: nftSubgraphUrl,
  cache: new InMemoryCache(),
});

export default apolloClientNFT;