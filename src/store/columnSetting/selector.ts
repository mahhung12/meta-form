import { get } from 'lodash';

import useColumnSettingStore, { usePersistedColumnSettingStore } from './useColumnSetting';

export const useGetColumnSetting = (
  key: string | undefined,
  address: string | undefined,
  defaultValue: string[] | undefined,
) =>
  useColumnSettingStore((state) => {
    if (!address || !key) return defaultValue;

    return get(state, ['columnSetting', address, key]) || defaultValue;
  });
export const useGetColumnSettingActions = () => usePersistedColumnSettingStore((state) => state.actions);
