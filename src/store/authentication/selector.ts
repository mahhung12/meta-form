import useAuthenticationStore from './useAuthenticationStore';

export const useAuthenticationActions = () => useAuthenticationStore((state) => state.actions);
export const useAuthenticationAddress = () => useAuthenticationStore((state) => state.address);
export const useAuthenticationListAddress = () => useAuthenticationStore((state) => state.listAddress);
