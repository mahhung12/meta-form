import type { FC, PropsWithChildren } from 'react';
import Router from 'next/router';
import { useSession } from 'next-auth/react';

const PrivateLayout: FC<PropsWithChildren> = ({ children }) => {
  const session = useSession();
  if (!session.data && session.status !== 'loading' && typeof window !== 'undefined') Router.push('/');

  return <>{children}</>;
};

export default PrivateLayout;
