import { Children, cloneElement, Dispatch, FC, isValidElement, PropsWithChildren, SetStateAction } from 'react';

import type { SorterResult } from 'antd/lib/table/interface';

export interface SearchContainerType {
  searchParams: any;
  setSearchParams: any;
  dataSource?: any[];
  sort?: SorterResult<any>;
  setSort?: Dispatch<SetStateAction<any>>;
  applyingColumns?: any[];
}

const SearchContainer: FC<PropsWithChildren<SearchContainerType>> = ({ children, ...props }) => (
  <>
    {Children.map(children, (child) => {
      if (isValidElement(child)) {
        // Element is HTML
        if (typeof child?.type === 'string') return child;

        // Element is React Element
        return cloneElement(child, {
          ...props,
        });
      }
      return null;
    })}
  </>
);

export default SearchContainer;
