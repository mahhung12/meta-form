import useStandardStore from 'store/standard/useStandardStore';

export const useStandardFormData = () => useStandardStore((state) => state.formData);
export const useStandardActions = () => useStandardStore((state) => state.actions);
