import { useEffect, useState } from 'react';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ColumnSetting {
  columnSetting: Record<string, Record<string, string[]>>;
}

export interface ColumnSettingAction {
  setColumnSetting: ({ key, setting, address }: { key: string; setting: string[]; address?: string }) => void;
}

const initialState = {
  columnSetting: {},

  actions: {
    setColumnSetting: () => {},
  },
};

export const usePersistedColumnSettingStore = create<ColumnSetting & { actions: ColumnSettingAction }>()(
  persist(
    immer((set) => ({
      ...initialState,

      actions: {
        ...initialState.actions,
        setColumnSetting: ({ key, setting, address }) =>
          set((state) => {
            if (address) {
              if (!state.columnSetting[address]) {
                state.columnSetting[address] = {};
              }
              state.columnSetting[address][key] = [...setting];
            }
          }),
      },
    })),
    {
      name: 'ColumnSetting',
      partialize: ({ columnSetting }) => ({ columnSetting }),
    },
  ),
);

export const useColumnSettingStoreHydration = () => {
  const [hydrated, setHydrated] = useState(usePersistedColumnSettingStore.persist?.hasHydrated);

  useEffect(() => {
    const unsubFinishHydration = usePersistedColumnSettingStore.persist?.onFinishHydration(() => setHydrated(true));

    setHydrated(usePersistedColumnSettingStore.persist?.hasHydrated());

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};

const useColumnSettingStore = ((selector, compare) => {
  const store = usePersistedColumnSettingStore(selector, compare);
  const [isHydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return isHydrated ? store : selector(initialState);
}) as typeof usePersistedColumnSettingStore;

export default useColumnSettingStore;
