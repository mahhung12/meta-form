import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';

import AppLayout from 'components/Layout/Public';
import HomePage from 'components/Pages/home';

import { NextPageWithLayout } from './_app';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPageWithLayout = () => (
  <div className='meta-container' style={{ background: '#fff' }}>
    <HomePage />
  </div>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Home;
