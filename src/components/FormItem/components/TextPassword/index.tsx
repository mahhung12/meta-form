import type { ChangeEvent, FC, FocusEvent } from 'react';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';

import { Input, InputProps } from 'antd';
import { MAX_LENGTH_PASSWORD } from 'constant/index';

import EyeCloseIcon from 'resources/svg/EyeCloseIcon';
import EyeOpenIcon from 'resources/svg/EyeOpenIcon';

type ITextPassword = {
  field?: ControllerRenderProps<any, string>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
};

const TextPassword: FC<InputProps & ITextPassword> = ({
  field,
  onChange,
  onBlur,
  maxLength = MAX_LENGTH_PASSWORD,
  ...props
}) => {
  const { trigger } = useFormContext();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value?.trim() !== e.target.value) return;

    field?.onChange(e);
    trigger(field?.name);
    if (onChange) onChange(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== field?.value) field?.onChange(e.target.value.trim());

    field?.onBlur();
    if (onBlur) onBlur(e);
  };

  return (
    <Input.Password
      {...field}
      maxLength={maxLength}
      onChange={handleChange}
      onBlur={handleBlur}
      iconRender={(visible) =>
        visible ? <EyeCloseIcon height={16} width={16} /> : <EyeOpenIcon height={16} width={16} />
      }
      {...props}
    />
  );
};

export default TextPassword;
