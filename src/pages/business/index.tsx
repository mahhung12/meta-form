import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';

import AppLayout from 'components/Layout/Public';
import BusinessPage from 'components/Pages/business';
import { NextPageWithLayout } from 'pages/_app';

const Business: NextPageWithLayout = () => (
  <div className='business-container'>
    <BusinessPage />
  </div>
);

Business.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Business;
