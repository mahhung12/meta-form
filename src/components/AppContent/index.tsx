import type { FC, PropsWithChildren } from 'react';

import { Layout } from 'antd';

const { Content: ContentAntd } = Layout;

const AppContent: FC<PropsWithChildren> = ({ children }) => {
  return <ContentAntd className='content-container'>{children}</ContentAntd>;
};

export default AppContent;
