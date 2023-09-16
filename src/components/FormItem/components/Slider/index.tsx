import type { FC } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import { Slider } from 'antd';
import type { SliderRangeProps, SliderSingleProps } from 'antd/lib/slider';

interface IFormSlider {
  field?: ControllerRenderProps<any, string>;
  onChange?: (value: [number, number] | number) => void;
}

const FormSlider: FC<(SliderSingleProps | SliderRangeProps) & IFormSlider> = ({ field, onChange, ...props }) => {
  const handleChange = (value: number | [number, number]) => {
    field?.onChange(value);
    if (onChange) onChange(value);
  };

  return <Slider {...field} {...props} onChange={handleChange} />;
};

export default FormSlider;
