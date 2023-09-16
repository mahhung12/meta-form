import type { FC } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import { Switch, SwitchProps } from 'antd';
import type { SwitchChangeEventHandler } from 'antd/lib/switch';

interface IFormSwitch {
  field?: ControllerRenderProps<any, string>;
  onChange: SwitchChangeEventHandler;
}

const FormSwitch: FC<SwitchProps & IFormSwitch> = ({ field, onChange, ...props }) => {
  const handleChange = (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => {
    if (onChange) onChange(checked, event);
    else field?.onChange(checked);
  };
  return <Switch {...field} {...props} checked={!!field?.value} onChange={handleChange} />;
};

export default FormSwitch;
