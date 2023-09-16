import React, { FC, PropsWithChildren } from 'react';

import { ConnectWallet } from '@thirdweb-dev/react';

import { useAuthenticationAddress } from 'store/authentication/selector';

const ButtonWalletConnect: FC<PropsWithChildren> = ({ children }) => {
  const address = useAuthenticationAddress();

  return <ConnectWallet />;
};

export default ButtonWalletConnect;
