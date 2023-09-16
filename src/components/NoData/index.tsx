import type { FC } from 'react';

type NoDataType = {
  message: string;
};

const NoData: FC<NoDataType> = ({ message }) => {
  return (
    <div className='no-data-wrapper'>
      <p>{message}</p>
    </div>
  );
};

export default NoData;
