import { FC, useMemo } from 'react';
import type { NumericFormatProps } from 'react-number-format';

import { Tooltip } from 'antd';
import BigNumber from 'bignumber.js';

import NumberFormat from 'components/NumberFormat';

import { trimTrailingZero } from 'utils';

const MAX_NUMBER_LENGTH = 12;
const MAX_TOOLTIP_DECIMALS = 9;
BigNumber.config({ EXPONENTIAL_AT: 100 });

const calculateMaxLength = (a: number, b: number) => {
  return a > b ? a : b;
};
const sliceValue = (value: string, maxLength: number) => value.slice(0, maxLength);

type FormattedNumber = NumericFormatProps & { amount: string | number; decimals?: number };

const FormattedNumber: FC<FormattedNumber> = ({ amount, decimals = 0, ...props }) => {
  const { formattedValue, tooltipAmount } = useMemo(() => {
    const bigNumberAmount = new BigNumber(amount).toString();
    const integerValue = new BigNumber(amount).integerValue(BigNumber.ROUND_DOWN).toString();
    const lengthOfIntegerValueWithDecimalSeparator = integerValue.length + 1;

    return {
      formattedValue: trimTrailingZero(
        //If integer value length bigger than max length, slice that number and show tooltip, otherwise return full number
        integerValue.length >= MAX_NUMBER_LENGTH
          ? sliceValue(integerValue, MAX_NUMBER_LENGTH)
          : //Slice equal numbers of integers + '.' + decimals. But max length cannot pass MAX_NUMBER_LENGTH
            sliceValue(
              bigNumberAmount,
              calculateMaxLength(decimals && lengthOfIntegerValueWithDecimalSeparator + decimals, MAX_NUMBER_LENGTH),
            ),
      ),
      tooltipAmount: trimTrailingZero(
        //Slice equal numbers of integers + '.' + decimals. But max decimal length cannot pass MAX_TOOLTIP_DECIMALS
        sliceValue(
          bigNumberAmount,
          calculateMaxLength(
            decimals && lengthOfIntegerValueWithDecimalSeparator + decimals,
            MAX_TOOLTIP_DECIMALS + lengthOfIntegerValueWithDecimalSeparator,
          ),
        ),
      ),
    };
  }, [amount, decimals]);

  return formattedValue?.length < tooltipAmount?.length ? (
    <Tooltip title={<NumberFormat displayType='text' value={tooltipAmount} {...props} />}>
      <span>
        <NumberFormat
          displayType='text'
          value={formattedValue}
          suffix={`... ${props?.suffix ? props.suffix : ''}`}
          thousandSeparator
          {...props}
        />
      </span>
    </Tooltip>
  ) : (
    <NumberFormat displayType='text' value={formattedValue} thousandSeparator {...props} />
  );
};

export default FormattedNumber;
