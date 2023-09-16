import type { SortOrder } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { ALL_OPTIONS, HTTP_STATUS_CONSTANTS, MAX_INTEGER_PRICE } from 'constant';
import { isNil } from 'lodash';

BigNumber.config({ EXPONENTIAL_AT: 100 });

export const validateStatus = (status: number): boolean => {
  return status === 200 || status === 201 || status === 400 || status === 401 || status === 500;
};

export const convertStatistics = (number: number): { value: string; suffix: string; fullValue?: string } => {
  const value = new BigNumber(number);

  if (!number || value.isLessThan(0))
    return {
      value: '0',
      suffix: '',
    };

  if (value.isLessThan(0.01))
    return {
      value: '0.00...',
      fullValue: value.toString(),
      suffix: '',
    };

  if (value.isGreaterThan(0.01) && value.isLessThan(1000))
    return {
      value: trimTrailingZero(value.toFixed(2).toString()),
      suffix: '',
    };

  if (value.isGreaterThanOrEqualTo(1000)) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(value.integerValue().toString().length / 3);
    const shortValue = (suffixNum != 0 ? value.div(Math.pow(1000, suffixNum)) : value).toPrecision(2);

    return {
      value: shortValue,
      suffix: suffixes[suffixNum],
    };
  }

  return {
    value: trimTrailingZero(value.toString()),
    suffix: '',
  };
};

export const clearRequestParams = (params?: any) => {
  const newParams = {} as any;
  const cloneParams = { ...params };

  for (const field in cloneParams) {
    if (cloneParams?.[field]?.length === 0) {
      delete cloneParams?.[field];
    }

    if (cloneParams?.[field] || cloneParams?.[field] === 0 || cloneParams?.[field] === false) {
      newParams[field] = cloneParams?.[field];
    }
  }

  return newParams;
};

export const getKeyInObject = (obj: Object | any) => {
  const objectKey = Object.keys(obj);

  return objectKey.map((key) => {
    return key;
  });
};

export const getNeededOptions = (first: Array<any>, second: Array<any>) => {
  return first.filter((item) => !second.includes(item));
};

export const getBalanceOptions = (first: Array<any>, second: Array<any>, options: Array<any> = []) => {
  return first.filter((item) => !second.includes(item) && options?.includes(item));
};

export const checkSuccessRequest = (response: any) => {
  return response?.status < HTTP_STATUS_CONSTANTS.ERROR;
};

export const getSortDirection = (order: SortOrder | undefined): 'desc' | 'asc' | undefined => {
  switch (order) {
    case 'descend':
      return 'desc';
    case 'ascend':
      return 'asc';
    default:
      return 'asc';
  }
};

export const getLocation = () => {
  return typeof window !== 'undefined' ? window.location.href : '';
};

export const limitMaxLengthNumber =
  (maxLength: number = MAX_INTEGER_PRICE) =>
  (inputObj: any) => {
    const { value } = inputObj;
    const integerPath = (value || '').split('.')[0];
    return integerPath.length <= maxLength;
  };

export const limitMaxLengthFullNumber =
  (maxLength: number = MAX_INTEGER_PRICE, maxDecimal = 0) =>
  (inputObj: any) => {
    const { value } = inputObj;
    const integerPath = (value || '').split('.')[0];
    const decimal = (value || '').split('.')[1];

    const maxInteger =
      maxLength - (decimal ? decimal?.length : maxDecimal) < MAX_INTEGER_PRICE
        ? maxLength - (decimal ? decimal?.length : maxDecimal)
        : MAX_INTEGER_PRICE;

    return integerPath.length <= maxInteger;
  };

export const limitMaxDecimalNumber = (
  maxLength: number = MAX_INTEGER_PRICE,
  value: string,
  maxDecimal: number | undefined,
) => {
  const integerPath = (value || '').split('.')[0];
  const currentLengthDecimal = maxLength - integerPath.length;

  return isValidStringNumber(maxDecimal) && currentLengthDecimal > maxDecimal ? maxDecimal : currentLengthDecimal;
};

// Custom type guard with predicate
export const isValidStringNumber = (value: number | string | undefined): value is number | string => {
  if (!value && value !== 0) {
    return false;
  }

  return true;
};

export const isLessThan = (first: number | string, second: number | string) => {
  if (!isValidStringNumber(first) || !isValidStringNumber(second)) {
    return true;
  }
  return new BigNumber(first).isLessThan(new BigNumber(second));
};

export const isLessThanOrEqualTo = (first?: number | string, second?: number | string) => {
  if (!isValidStringNumber(first) || !isValidStringNumber(second)) {
    return true;
  }
  return new BigNumber(first).isLessThanOrEqualTo(new BigNumber(second));
};

export const formatInteger = (value: number | string, decimal?: number) => {
  if (isNil(value)) return 0;
  return decimal ? new BigNumber(value).toFormat(decimal) : new BigNumber(value).toFormat();
};

export const multipleNumber = (first: string | number | undefined, second: string | number | undefined) => {
  if (isNil(first) || isNil(second)) return 0;
  return new BigNumber(first).multipliedBy(new BigNumber(second)).toString();
};

export const dividedNumber = (first: string | number | undefined, second: string | number | undefined) => {
  if (isNil(first) || isNil(second)) return 0;
  return new BigNumber(first).dividedBy(new BigNumber(second)).toString();
};

export const plusNumber = (first?: string | number, second?: string | number) => {
  if (isNil(first) || isNil(second)) return 0;
  return new BigNumber(first).plus(new BigNumber(second)).toString();
};

export const calcBalances = (amount: number | bigint, decimalToken: number) => {
  if (amount === 0) return '0';
  return new BigNumber(amount.toString()).multipliedBy(new BigNumber(10).pow(-decimalToken)).toString();
};

export const convertToNumber = (percentage: number) => {
  return percentage / 100;
};

export const trimTrailingZero = (value: string) => {
  return value.replace(/\.0*$|(\.\d*[1-9])0+$/, '$1');
};

export const stripEmptyValue = (obj: any) => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    if (v !== null && v !== undefined && v !== '') {
      return { ...acc, [k]: v };
    }

    return acc;
  }, {});
};

export const stripValues = (obj: any, obj2: any) => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    if (!(k in obj2)) {
      return { ...acc, [k]: v };
    }

    return acc;
  }, {});
};

export const stripAllOption = (obj: any, keys: string[]) => {
  const cloneObj = { ...obj };
  for (const key of keys) {
    if (key in cloneObj && cloneObj[key] === ALL_OPTIONS) {
      delete cloneObj[key];
    }
  }

  return cloneObj;
};

export const getIpfsLink = (urlIPFS: string, cid: string) => {
  if (!urlIPFS || !cid) return '';
  return `${urlIPFS}/${cid}`;
};

export const clearDotValue = (value: string) => {
  const splitValue = value.split('.');
  return splitValue?.[1] ? value : splitValue?.[0];
};

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getPriceWithComparedValue = (value: string | number, compareValue = 1e-3, defaultDisplay?: string) => {
  if (isNil(value)) {
    return;
  }
  if (new BigNumber(value).isEqualTo(0)) {
    return defaultDisplay ?? '0';
  }
  if (new BigNumber(value).isLessThan(compareValue)) {
    return compareValue.toString();
  }
  return value;
};
