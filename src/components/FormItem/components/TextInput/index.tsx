import type { ChangeEvent, FC, FocusEvent } from 'react';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';

import { Input, InputProps } from 'antd';
import { LENGTH_CONSTANTS } from 'constant';

type ITextInput = {
  field?: ControllerRenderProps<any, string>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
};

const TextInput: FC<InputProps & ITextInput> = ({
  field,
  onChange,
  onBlur,
  maxLength = LENGTH_CONSTANTS.MAX_LENGTH_INPUT,
  ...props
}) => {
  const { trigger } = useFormContext();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field?.onChange(e);
    trigger(field?.name);
    if (onChange) onChange(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== field?.value) field?.onChange(e.target.value.trim());

    field?.onBlur();
    if (onBlur) onBlur(e);
  };

  return <Input {...field} maxLength={maxLength} onChange={handleChange} onBlur={handleBlur} {...props} />;
};

export default TextInput;
