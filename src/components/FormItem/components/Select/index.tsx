import { ChangeEvent, FC, ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import { Checkbox, Select, SelectProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import cx from 'classnames';
import { ALL_OPTIONS } from 'constant';

import IconDropdown from 'resources/svg/IconDropdown';

const { Option } = Select;

type OptionType = {
  value: any;
  name: any;
};

type ISelectInput = {
  field?: ControllerRenderProps<any, string>;
  options: OptionType[];
  prefix?: ReactNode;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  optionsType?: 'checkbox';
  enableAllOption?: boolean;
  optionsRenderProps?: (item: OptionType) => any;
  suffixIcon?: ReactNode;
  allOptionsText?: string;
};

const SelectInput: FC<SelectProps<any, OptionType> & ISelectInput> = ({
  field,
  options,
  prefix,
  className,
  onChange,
  optionsType,
  enableAllOption,
  optionsRenderProps,
  suffixIcon = <IconDropdown />,
  allOptionsText = 'common.all',
  ...props
}) => {
  const { t } = useTranslation();

  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const { value } = field || {};

  const optionsValue =
    enableAllOption && optionsType !== 'checkbox' && options.length > 1
      ? [
          {
            value: ALL_OPTIONS,
            name: allOptionsText,
          },
        ].concat(options)
      : options;

  useEffect(() => {
    setIndeterminate(!!value && value.length > 0 && value.length < optionsValue.length);
    setCheckAll(!!value && value.length > 0 && value.length === optionsValue.length);
  }, [value]);

  const onCheckAllOptions = (event: CheckboxChangeEvent) => {
    const { checked } = event.target;

    let values = [];
    if (checked) {
      values = optionsValue.map((option) => option.value);
    } else {
      values = [];
    }
    setIndeterminate(false);
    setCheckAll(checked);
    onChangeSelect(values);
  };

  const optionsSelectAllRender = () => {
    switch (optionsType) {
      case 'checkbox': {
        return (
          <div className='search-form__all-options'>
            <Checkbox onChange={onCheckAllOptions} id={ALL_OPTIONS} indeterminate={indeterminate} checked={checkAll}>
              {t(allOptionsText)}
            </Checkbox>
          </div>
        );
      }
      default: {
        return null;
      }
    }
  };

  const optionsRender = (item: OptionType) => {
    switch (optionsType) {
      case 'checkbox': {
        return (
          <Checkbox id={item.value} checked={value && value.indexOf(item.value) >= 0}>
            <div onClick={onPreventMouseDown}>
              {optionsRenderProps && item?.value !== ALL_OPTIONS ? optionsRenderProps(item) : t(item.name)}
            </div>
          </Checkbox>
        );
      }
      default: {
        return optionsRenderProps && item?.value !== ALL_OPTIONS ? optionsRenderProps(item) : t(item.name);
      }
    }
  };

  const onPreventMouseDown = (event: SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const onChangeSelect = (val: any) => {
    field?.onChange(val);
    if (onChange) onChange(val);
  };

  return (
    <div className={cx('ant-select-wrapper', className)}>
      {prefix}
      <Select
        {...field}
        onChange={onChangeSelect}
        getPopupContainer={(trigger) => trigger.parentElement}
        notFoundContent={null}
        suffixIcon={suffixIcon}
        dropdownRender={(menu) => (
          <>
            {enableAllOption && optionsValue.length > 1 && optionsSelectAllRender()}
            {menu}
          </>
        )}
        {...props}
      >
        {optionsValue.map((item) => (
          <Option value={item.value} key={item.value} label={item.name}>
            {optionsRender(item)}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectInput;
