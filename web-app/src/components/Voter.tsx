import {
  Flex,
  Box,
  Text,
  Button,
  Input,
  FormLabel,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import { SettingsIcon, ChevronDownIcon } from '@chakra-ui/icons';

import { useState } from 'react';

const networkIdMapping = {
  1: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  137: {
    name: 'Polygon',
    symbol: 'MATIC',
  },
  250: {
    name: 'Fantom',
    symbol: 'FTM',
  },
  80001: {
    name: 'Mumbai',
    symbol: 'MATIC',
  },
  100: {
    name: 'xDai',
    symbol: 'xDAI',
  },
  5: {
    name: 'Goerli',
    symbol: 'ETH',
  },
};

const votingOptions = {
  Yes: 2,
  No: 3,
  Abstain: 1,
};

type Props = {
  provider: any;
  setProvider: any;
  account: any;
  setAccount: any;
  chainId: any;
  setChainId: any;
};

export default function Voter(props: Props) {
  const { provider, setProvider, account, setAccount, chainId, setChainId } =
    props;
  const [vote, setVote] = useState('Yes');
  const [voteAmount, setVoteAmount] = useState(0);
  const [contractAddress, setContractAddress] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [proposalId, setProposalId] = useState(0);

  return (
    <>
      <Box
        w="40.62rem"
        mx="auto"
        mt="5.25rem"
        boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
        borderRadius="1.37rem"
      >
        <Flex
          alignItems="center"
          p="1rem 1.25rem 0.5rem"
          bg="white"
          color="rgb(86, 90, 105)"
          justifyContent="space-between"
          borderRadius="1.37rem 1.37rem 0 0"
        >
          <Text color="black" fontWeight="800">
            LemonSoda
          </Text>
          <SettingsIcon
            fontSize="1.25rem"
            cursor="pointer"
            _hover={{ color: 'rgb(128,128,128)' }}
          />
        </Flex>

        <Box p="0.5rem" bg="white" borderRadius="0 0 1.37rem 1.37rem">
          {/* Contract Start */}
          <div>
            <FormLabel htmlFor="contractAddress" p="1rem 1.25rem 0.5rem">
              Contract
            </FormLabel>
            <Flex
              alignItems="center"
              justifyContent="flex-end"
              bg="rgb(247, 248, 250)"
              p="1rem 1rem 1.7rem"
              borderRadius="1.25rem"
              border="0.06rem solid rgb(237, 238, 242)"
              _hover={{ border: '0.06rem solid rgb(211,211,211)' }}
            >
              <Box>
                <Input
                  placeholder="0x0123abc..."
                  fontWeight="500"
                  fontSize="1.5rem"
                  width="100%"
                  size="19rem"
                  textAlign="right"
                  bg="rgb(247, 248, 250)"
                  outline="none"
                  border="none"
                  focusBorderColor="none"
                  type="text"
                  id="contractAddress"
                  onChange={(e) => setContractAddress(e.target.value)}
                  value={contractAddress}
                />
              </Box>
            </Flex>
          </div>
          {/* Contract End */}

          {/* Amount Start */}
          <div>
            <FormLabel htmlFor="contractAddress" p="1rem 1.25rem 0.5rem">
              Number of Tokens
            </FormLabel>
            <Flex
              alignItems="center"
              justifyContent="flex-end"
              bg="rgb(247, 248, 250)"
              p="1rem 1rem 1.7rem"
              borderRadius="1.25rem"
              border="0.06rem solid rgb(237, 238, 242)"
              _hover={{ border: '0.06rem solid rgb(211,211,211)' }}
            >
              <Box>
                <Input
                  placeholder="100"
                  fontWeight="500"
                  fontSize="1.5rem"
                  width="100%"
                  size="19rem"
                  textAlign="right"
                  bg="rgb(247, 248, 250)"
                  outline="none"
                  border="none"
                  focusBorderColor="none"
                  type="number"
                  id="contractAddress"
                  onChange={(e) => setVoteAmount(parseInt(e.target.value))}
                  value={voteAmount}
                />
              </Box>
            </Flex>
          </div>
          {/* Amount End */}

          {/* Symbol Start */}
          <div>
            <FormLabel htmlFor="contractAddress" p="1rem 1.25rem 0.5rem">
              Token Symbol
            </FormLabel>
            <Flex
              alignItems="center"
              justifyContent="flex-end"
              bg="rgb(247, 248, 250)"
              p="1rem 1rem 1.7rem"
              borderRadius="1.25rem"
              border="0.06rem solid rgb(237, 238, 242)"
              _hover={{ border: '0.06rem solid rgb(211,211,211)' }}
            >
              <Box>
                <Input
                  placeholder="LST"
                  fontWeight="500"
                  fontSize="1.5rem"
                  width="100%"
                  size="19rem"
                  textAlign="right"
                  bg="rgb(247, 248, 250)"
                  outline="none"
                  border="none"
                  focusBorderColor="none"
                  type="text"
                  id="contractAddress"
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  value={tokenSymbol}
                />
              </Box>
            </Flex>
          </div>
          {/* Symbol End */}

          {/* Proposal ID Start */}
          <div>
            <FormLabel htmlFor="contractAddress" p="1rem 1.25rem 0.5rem">
              Proposal ID
            </FormLabel>
            <Flex
              alignItems="center"
              justifyContent="flex-end"
              bg="rgb(247, 248, 250)"
              p="1rem 1rem 1.7rem"
              borderRadius="1.25rem"
              border="0.06rem solid rgb(237, 238, 242)"
              _hover={{ border: '0.06rem solid rgb(211,211,211)' }}
            >
              <Box>
                <Input
                  placeholder="100"
                  fontWeight="500"
                  fontSize="1.5rem"
                  width="100%"
                  size="19rem"
                  textAlign="right"
                  bg="rgb(247, 248, 250)"
                  outline="none"
                  border="none"
                  focusBorderColor="none"
                  type="number"
                  id="contractAddress"
                  onChange={(e) => setProposalId(parseInt(e.target.value))}
                  value={proposalId}
                />
              </Box>
            </Flex>
          </div>
          {/* Proposal ID End */}

          {/* Vote Start */}
          <div>
            <FormLabel htmlFor="contractAddress" p="1rem 1.25rem 0.5rem">
              Vote
            </FormLabel>
            <Flex
              alignItems="center"
              justifyContent="flex-end"
              bg="rgb(247, 248, 250)"
              p="1rem 1rem 1.7rem"
              borderRadius="1.25rem"
              border="0.06rem solid rgb(237, 238, 242)"
              _hover={{ border: '0.06rem solid rgb(211,211,211)' }}
            >
              <Box>
                <Menu>
                  <MenuButton
                    as={Button}
                    bg="orange.200"
                    color="orange.800"
                    p="0rem 1rem"
                    borderRadius="1.12rem"
                    _hover={{ bg: 'rgb(207, 0, 99)' }}
                    rightIcon={
                      <ChevronDownIcon fontSize="1.37rem" cursor="pointer" />
                    }
                  >
                    {vote}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => setVote('Yes')}>Yes</MenuItem>
                    <MenuItem onClick={() => setVote('No')}>No</MenuItem>
                    <MenuItem onClick={() => setVote('Abstain')}>
                      Abstain
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
          </div>
          {/* Vote End */}

          <Flex></Flex>
          <Box mt="0.5rem">
            <Button
              color="orange.800"
              bg="orange.200"
              width="100%"
              p="1.62rem"
              borderRadius="1.25rem"
              _hover={{ bg: 'rgb(251, 211, 225)' }}
            >
              Vote, vote, vote!
            </Button>
          </Box>
        </Box>
      </Box>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
