import type { FC } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import type { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import generatePicker from 'antd/lib/date-picker/generatePicker';
import { DEFAULT_SEARCH_DATE_FORMAT } from 'constant';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

import IconCalender from 'resources/svg/IconCalender';

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

interface IFormRangePicker {
  field?: ControllerRenderProps<any, string>;
  onChange?: (value: any) => void;
}

const { RangePicker } = DatePicker;

const FormRangePicker: FC<RangePickerProps<Date> & IFormRangePicker> = ({ field, onChange, ...props }) => {
  const handleChange = (value: any) => {
    field?.onChange(value);
    if (onChange) onChange(value);
  };

  return (
    <RangePicker
      inputReadOnly
      format={DEFAULT_SEARCH_DATE_FORMAT}
      {...field}
      {...props}
      onChange={handleChange}
      suffixIcon={<IconCalender />}
    />
  );
};

export default FormRangePicker;
