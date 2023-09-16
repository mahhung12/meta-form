import { create } from 'zustand';

interface ScrollRestoration {
  shouldScrollRestore: boolean;
  previousRoute: string;
}

export interface ScrollRestorationAction {
  setShouldScrollRestore: (shouldScrollRestore: ScrollRestoration['shouldScrollRestore']) => void;
  setPreviousRoute: (shouldScrollRestore: ScrollRestoration['previousRoute']) => void;
}

const initialState: ScrollRestoration = {
  shouldScrollRestore: false,
  previousRoute: '',
};

const useNftStore = create<ScrollRestoration & { actions: ScrollRestorationAction }>((set) => ({
  //States
  ...initialState,

  //Actions
  actions: {
    setShouldScrollRestore: (shouldScrollRestore) => set({ shouldScrollRestore }),
    setPreviousRoute: (previousRoute) => set({ previousRoute }),
  },
}));

export default useNftStore;
