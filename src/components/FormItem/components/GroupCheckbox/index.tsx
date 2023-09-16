import type { FC } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import { Checkbox } from 'antd';
import type { CheckboxGroupProps, CheckboxValueType } from 'antd/lib/checkbox/Group';

interface IFormCheckbox {
  field?: ControllerRenderProps<any, string>;
  onChange?: (event: CheckboxValueType[]) => void;
}

const FormCheckboxGroup: FC<CheckboxGroupProps & IFormCheckbox> = ({ field, onChange, ...props }) => {
  const handleChange = (e: CheckboxValueType[]) => {
    field?.onChange(e);
    if (onChange) onChange(e);
  };

  return <Checkbox.Group {...field} onChange={handleChange} {...props} />;
};

export default FormCheckboxGroup;
