import React, { FC, PropsWithChildren } from 'react';

import { useAddress } from '@thirdweb-dev/react';

export const AppConnectWalletWrapper: FC<PropsWithChildren> = ({ children }) => {
  const address = useAddress();

  return <>{children}</>;
};

export default AppConnectWalletWrapper;
