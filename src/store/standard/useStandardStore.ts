import { create } from 'zustand';

interface StandardStore {
  formData?: any;
}

export interface StandardAction {
  handleSetFormData: (formData: StandardStore['formData']) => void;
}

const initialState = {
  formData: {},
};

const useStandardStore = create<StandardStore & { actions: StandardAction }>((set, get) => ({
  ...initialState,
  actions: {
    handleSetFormData: (formData) => {
      set({ formData });
    },
  },
}));

export default useStandardStore;
