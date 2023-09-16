export const MAX_COLUMNS = 9;
export const DOLLAR_PREFIX = '$';
export const TILDE_ICON = '~';
export const EMPTY_DEFAULT_TEXT = '--';
export const DEFAULT_QUANTITY = 1;
export const SLIDE_SHOW = 3;
export const SLIDE_SHOW_MOBILE = 2;
export const DEFAULT_SEARCH_DATE_FORMAT = 'DD/MM/YYYY';
export const ALL_OPTIONS = 'all';
export const MAX_INTEGER_PRICE = 9;
export const MAX_LENGTH_PASSWORD = 18;

export const LENGTH_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_TOTAL: 0,
  DEFAULT_NFT_LIST: 6,
  MAX_LENGTH_INPUT: 256,
  DEFAULT_PAGE_SIZE: 10,
  MAX_LENGTH_DESCRIPTION: 320,
  DEFAULT_TEXTAREA_ROWS: 5,
  DEFAULT_PAGE_SIZE_OPTIONS: ['10', '20', '50'],
  DEFAULT_PAGE_SIZE_NFT_SET_AVATAR: 6,
  DEFAULT_PAGE_SIZE_NFT_BREED: 6,
};

export const HTTP_STATUS_CONSTANTS = {
  OK: 200,
  ERROR_CODE_401: 401,
  SERVER_ERROR: 'E0',
  ERROR: 400,
};

export const TYPE_CONSTANTS = {
  MESSAGE: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warn',
  } as const,
};
