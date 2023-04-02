import { ReactNode } from 'react';
import { Flex, Menu, Image } from '@chakra-ui/react';

import logo from '../assets/logo.png';

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Menu>
      <Flex
        d="flex"
        alignItens="center"
        justifyContent="space-between"
        maxW="83.43rem"
        mx="auto"
        mt="1.5rem"
      >
        <Image boxSize="8.56rem" src={logo} alt="Lemon Soda Logo " />
        {children}
      </Flex>
    </Menu>
  );
}
