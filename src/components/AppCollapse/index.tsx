import { Collapse, CollapsePanelProps, CollapseProps } from 'antd';

const { Panel } = Collapse;

export type IAppCollapse = CollapseProps & CollapsePanelProps;

const AppCollapse: React.FC<IAppCollapse> = (props) => {
  const { header, children } = props;
  return (
    <Collapse
      className='app-collapse'
      defaultActiveKey={['collapse_panel_key']}
      // expandIcon={({ isActive }) => <ArrowDownIcon rotate={isActive ? -90 : 0} className={isActive ? '' : 'rotate'} />}
      expandIconPosition={'end'}
      {...props}
    >
      <Panel
        header={<div className='header-wrapper'>{header}</div>}
        key='collapse_panel_key'
        className='app-collapse-panel'
      >
        {children}
      </Panel>
    </Collapse>
  );
};

export default AppCollapse;
