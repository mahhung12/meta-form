import type { FC, FocusEvent } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import { Input } from 'antd';
import type { SearchProps } from 'antd/lib/input';
import { LENGTH_CONSTANTS } from 'constant';

import IconSearch from 'resources/svg/IconSearch';

const { Search } = Input;

interface ISearchInput {
  field?: ControllerRenderProps<any, string>;
  placeholder?: string;
  title?: string;
  onBlur?: () => void;
  onSearch?: () => void;
  onChange?: () => void;
}

const SearchInput: FC<SearchProps & ISearchInput> = ({ field, onBlur, onSearch, onChange, title, ...props }) => {
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== field?.value) field?.onChange(e.target.value.trim());
    field?.onBlur();
    if (onBlur) onBlur();
  };

  const handleSearch = (e: string) => {
    if (e?.trim() !== field?.value) field?.onChange(e.trim());
    if (onSearch) onSearch();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field?.onChange(e);
    if (onChange) onChange(e);
  };

  return (
    <Search
      maxLength={LENGTH_CONSTANTS.MAX_LENGTH_INPUT}
      enterButton={<IconSearch />}
      {...field}
      {...props}
      onChange={handleOnChange}
      onBlur={handleBlur}
      onSearch={handleSearch}
      title={title || props?.placeholder}
    />
  );
};

export default SearchInput;
