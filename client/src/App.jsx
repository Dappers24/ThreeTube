import { useContext } from 'react';
import Web3 from 'web3';
import Wallet from './components/wallet';
import { Context } from './context/context';
import Navbar from './components/navbar';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

// GraphQL query for the subgraph
const query = gql`{
  videoAddeds(first: 5) {
    id
    videoId
    cid
    metadata
  }
  videoLikeds(first: 5) {
    id
    videoId
    likes
    blockNumber
  }
}`;
const url = 'https://api.studio.thegraph.com/query/91423/hack/version/latest';

function App() {
  const context = useContext(Context);
  const { setAccData, isConnected, setIsConnected } = context;

  // Detect Metamask provider
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      alert("Window does not support Metamask");
    }
    return provider;
  };

  // Connect to Metamask
  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        let ethAddress = userAccount[0];
        let ethBalance = await web3.eth.getBalance(ethAddress);
        ethBalance = web3.utils.fromWei(ethBalance, 'ether');
        const data = {
          balance: ethBalance,
          address: ethAddress,
        };
        setAccData(data);
        setIsConnected(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch data from the subgraph
  const { data, status } = useQuery({
    queryKey: ['data'],
    queryFn: async () => await request(url, query),
    enabled: isConnected, // Only fetch data when connected
  });

  return (
    <div className="page-wrapper">
      {!isConnected ? (
        <Wallet onConnect={onConnect} />
      ) : (
        <>
          <Navbar />
          <main>
            {status === 'loading' && <div>Loading...</div>}
            {status === 'error' && <div>Error occurred querying the Subgraph</div>}
            {status === 'success' && (
              <div>
                <h2>Subgraph Data</h2>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}

// QueryClient setup for react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function RootApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}