import useScrollRestorationStore from './useScrollRestorationStore';

export const useGetShouldScrollRestore = () => useScrollRestorationStore((state) => state.shouldScrollRestore);
export const useGetPreviousRoute = () => useScrollRestorationStore((state) => state.previousRoute);
export const useGetScrollRestorationStoreActions = () => useScrollRestorationStore((state) => state.actions);
