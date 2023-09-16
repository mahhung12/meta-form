import { toast, TypeOptions } from 'react-toastify';
import { i18n } from 'next-i18next';

const showMessage = (msgType: Exclude<TypeOptions, 'default'>, msgContent: any, objValue?: any) => {
  if (typeof document === 'undefined') {
    return;
  }

  let fieldMsg;
  if (objValue) {
    const key = (Object.keys(objValue) || [])[0];
    const val = objValue[key];
    fieldMsg = {
      [key]: i18n?.t(val),
    } as any;
  }

  if (msgContent) {
    toast[msgType](i18n?.t(msgContent, fieldMsg) || msgContent, {
      className: 'event-message',
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};

export default showMessage;
