import type { FC } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import { Checkbox } from 'antd';
import type { CheckboxChangeEvent, CheckboxProps } from 'antd/lib/checkbox';

interface IFormCheckbox {
  field?: ControllerRenderProps<any, string>;
  onChange?: (event: CheckboxChangeEvent) => void;
}

const FormCheckbox: FC<CheckboxProps & IFormCheckbox> = ({ field, onChange, ...props }) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    field?.onChange(e);
    if (onChange) onChange(e);
  };

  return <Checkbox {...field} onChange={handleChange} {...props} />;
};

export default FormCheckbox;
