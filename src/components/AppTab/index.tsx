import type { FC } from 'react';

import { Tabs } from 'antd';
import classNames from 'classnames';

const { TabPane } = Tabs;

interface Tab {
  key: string;
  tab: string;
  content: any;
  className?: string;
}

interface TabsInterface {
  onChangeTab: any;
  activeKey: string;
  listTab: Tab[];
  tabBarExtraContent?: any;
  className?: string;
}

const AppTab: FC<TabsInterface> = ({ listTab, onChangeTab, className, ...props }) => (
  <Tabs className={classNames('app-tab', className)} onChange={onChangeTab} {...props}>
    {listTab.map(({ content, key, tab }: Tab) => (
      <TabPane key={key} tab={tab} className='tab-pane'>
        {content}
      </TabPane>
    ))}
  </Tabs>
);

export default AppTab;
