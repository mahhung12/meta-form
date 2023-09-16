import { omit } from 'lodash';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface Authentication {
  address?: string;
  listAddress: any;
  token?: string;
}

export interface AuthenticationAction {
  handleSetAddress: ({ address }: Pick<Authentication, 'address'>) => void;
  handleRemoveAddress: ({ address }: Pick<Authentication, 'address'>) => void;
  handleAddAddress: ({ address, signature }: Pick<Authentication, 'address'> & { signature: string }) => void;

  handleSetToken: ({ token }: Pick<Authentication, 'token'>) => void;
}

const initialState = {
  address: '',
  listAddress: {},
  token: '',
};

const useAuthenticationStore = create<Authentication & { actions: AuthenticationAction }>()(
  persist(
    immer((set) => ({
      //States
      ...initialState,

      //Actions
      actions: {
        handleSetAddress: ({ address }) => set({ address }),

        handleRemoveAddress: ({ address }) =>
          set((state) => {
            if (address) {
              state.listAddress = omit(state?.listAddress, [address]);
            }
            state.address = '';
          }),

        handleAddAddress: ({ address, signature }) =>
          set((state) => {
            state.address = address;

            if (address) {
              state.listAddress[address] = {
                address,
                signature,
              };
            }
          }),

        handleSetToken: ({ token }) => set({ token }),
      },
    })),
    {
      name: 'Authentication',
      partialize: ({ address, listAddress, token }) => ({ address, listAddress, token }),
    },
  ),
);

export default useAuthenticationStore;
