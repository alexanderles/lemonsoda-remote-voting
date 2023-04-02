import { Button, Box, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useEffect, SetStateAction } from 'react';

type Props = {
  provider: any;
  setProvider: any;
  account: any;
  setAccount: any;
  chainId: any;
  setChainId: any;
};

export default function ConnectButton(props: Props) {
  const { provider, setProvider, account, setAccount, chainId, setChainId } =
    props;

  // Connect to the wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setProvider(web3Provider);
      } catch (error) {
        console.error('User rejected the request', error);
      }
    } else {
      console.error('Ethereum browser extension not detected!');
    }
  };

  // Update account details
  useEffect(() => {
    if (!provider) return;

    const updateAccount = async () => {
      const [acc] = await provider.listAccounts();
      setAccount(acc);

      const cid = await provider
        .getNetwork()
        .then((network: { chainId: any }) => network.chainId);
      setChainId(cid);
    };

    updateAccount();

    const onAccountsChanged = (accounts: SetStateAction<string>[]) => {
      setAccount(accounts[0]);
    };

    const onChainChanged = (chainIdHex: string) => {
      const cid = parseInt(chainIdHex, 16);
      setChainId(cid);
    };

    window.ethereum.on('accountsChanged', onAccountsChanged);
    window.ethereum.on('chainChanged', onChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', onAccountsChanged);
      window.ethereum.removeListener('chainChanged', onChainChanged);
    };
  }, [provider]);

  return (
    <Box>
      {account ? (
        <Box
          bg="#fbd28d"
          p="0.5rem 2.5rem 0.5rem 2.5rem"
          borderRadius="1.25rem"
          border="0.06rem solid rgb(237, 238, 242)"
          color="orange.800"
        >
          <Text fontSize="sm">
            {`${account.slice(0, 6)}...${account.slice(-4)}`}
          </Text>
          <br />
          <Text fontSize="sm">Chain ID: {chainId}</Text>
        </Box>
      ) : (
        <Button bg="orange.200" color="orange.800" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </Box>
  );
}
