import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';

import AppLayout from 'components/Layout/Public';
import ConfirmPage from 'components/Pages/confirm';
import { NextPageWithLayout } from 'pages/_app';

const Confirm: NextPageWithLayout = () => (
  <div className='confirm-container' style={{ background: '#fff' }}>
    <ConfirmPage />
  </div>
);

Confirm.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Confirm;
