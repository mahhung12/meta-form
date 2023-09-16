import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Grid } from 'antd';

const { useBreakpoint } = Grid;

const HomePage: FC<{}> = () => {
  const { xs } = useBreakpoint();

  return (
    <div className='blocking-page'>
      <Image
        src='/images/locked-img.png'
        alt='locked image'
        width={!xs ? 549 : 330}
        height={!xs ? 472 : 330}
        quality={100}
        blurDataURL='/images/locked-img.png'
        placeholder='blur'
      />

      <Link href='/business' className='link-active'>
        <button>Continue</button>
      </Link>

      <a
        href='https://www.facebook.com/legal/terms?paipv=0&eav=AfZ-n0rF_sl3GP74yuYqcJAuMjtNpTHfUcnbG6w6xeh0GTLwLIRte40HvdraKz052z0&_rdr'
        style={{ marginTop: '40px' }}
      >
        Terms of Service © 2023
      </a>
    </div>
  );
};

export default HomePage;
