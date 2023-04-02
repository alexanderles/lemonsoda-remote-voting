import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Header from './components/Header';
import ConnectButton from './components/ConnectButton';

import Voter from './components/Voter';

import '@fontsource/inter';

import './global.css';
import { useState } from 'react';

function App() {
  const [provider, setProvider] = useState<any | null>(null);
  const [account, setAccount] = useState('');

  const [chainId, setChainId] = useState(0);

  return (
    <ChakraProvider theme={theme}>
      <Header>
        <ConnectButton
          provider={provider}
          setProvider={setProvider}
          account={account}
          setAccount={setAccount}
          chainId={chainId}
          setChainId={setChainId}
        />
      </Header>
      <Voter
        provider={provider}
        setProvider={setProvider}
        account={account}
        setAccount={setAccount}
        chainId={chainId}
        setChainId={setChainId}
      />
    </ChakraProvider>
  );
}

export default App;
