import { ChangeEvent, forwardRef, ForwardRefRenderFunction } from 'react';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';
import type { InputAttributes, NumberFormatValues, NumericFormatProps } from 'react-number-format';

import { Input, InputProps } from 'antd';

import NumberFormat from 'components/NumberFormat';

import { clearDotValue } from 'utils';

interface IFormNumber {
  field?: ControllerRenderProps<any, string>;
  onChange?: (event: React.FormEvent<HTMLInputElement>, numAsString?: string) => void;
  onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
  onValueChange?: (values: NumberFormatValues) => void;
}

const FormNumber: ForwardRefRenderFunction<
  NumberFormat,
  NumericFormatProps<InputAttributes & InputProps> & IFormNumber
> = ({ field, onChange, thousandSeparator, onValueChange, ...props }, ref) => {
  const { setValue, trigger } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, numAsString = '') => {
    if (onChange) onChange(e, clearDotValue(numAsString));

    if (field?.name) {
      trigger(field?.name, { shouldFocus: true });
      setValue(field.name, clearDotValue(numAsString));
    }

    if (thousandSeparator) {
      return;
    } else {
      field?.onChange(e);
    }
  };

  const handleValueChange = (values: NumberFormatValues) => {
    if (thousandSeparator) {
      setValue(field?.name as string, values.value);
      if (onValueChange) {
        onValueChange(values);
      }
    }
  };

  return (
    <NumberFormat
      customInput={Input as any}
      allowNegative={false}
      {...field}
      {...props}
      onChange={handleChange}
      onValueChange={handleValueChange}
      thousandSeparator={thousandSeparator}
      ref={ref}
    />
  );
};

export default forwardRef(FormNumber);
