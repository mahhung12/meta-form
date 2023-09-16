import { getI18n } from 'react-i18next';

import type { AxiosResponse } from 'axios';
import { HTTP_STATUS_CONSTANTS, TYPE_CONSTANTS } from 'constant';

import showMessage from 'components/Message';

import axios from './axios';

class ApiService {
  private HEADERS;
  private EXCLUDED_RESPONSE = ['empty_response'];
  private MESSAGE_TYPE = TYPE_CONSTANTS.MESSAGE;

  constructor() {
    this.HEADERS = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };
  }

  get HEADERS_MULTIPLE_PART() {
    return {
      ...this.HEADERS,
      'Content-Type': 'multipart/form-data; boundary=something',
      Accept: 'application/json',
    };
  }

  private validateStatus(status: number): boolean {
    return [200, 201, 400, 401, 500].includes(status);
  }

  private checkExpiredOrAuthorization(response: any) {
    return response?.status === HTTP_STATUS_CONSTANTS.ERROR_CODE_401;
  }

  private handleExpiredAuthorization(endpoint: string, params: any = {}, options?: any) {}

  private checkErrorStatus(
    response: any,
    options?: {
      isHideErrorMessage?: any;
    },
  ) {
    if (options?.isHideErrorMessage) return response;

    const { status, data, meta, code: errorCode } = response || {};

    if (status >= HTTP_STATUS_CONSTANTS.ERROR && !this.EXCLUDED_RESPONSE.includes(data?.code)) {
      if (data?.code && data?.code !== HTTP_STATUS_CONSTANTS.SERVER_ERROR) {
        showMessage(this.MESSAGE_TYPE.ERROR, `message.${data?.code}`, meta?.extraInfo);
      } else if (errorCode) {
        showMessage(this.MESSAGE_TYPE.ERROR, `message.${errorCode}`, meta?.extraInfo);
      } else if (meta?.msg) {
        showMessage(this.MESSAGE_TYPE.ERROR, meta?.msg);
      } else if (data?.message) {
        showMessage(this.MESSAGE_TYPE.ERROR, data?.message);
      }
    }

    return response;
  }

  private checkErrorNetwork(err: any) {
    if (err?.toJSON() && err.toJSON().message === 'Network Error') {
      return showMessage(this.MESSAGE_TYPE.ERROR, getI18n()?.t(err.toJSON().message));
    }

    return err;
  }

  private handleSuccessRequest({
    response,
    endpoint,
    params,
    options,
  }: {
    response: AxiosResponse<any, any>;
    endpoint: string;
    params: any;
    options: any;
  }) {
    if (this.checkExpiredOrAuthorization(response)) {
      this.handleExpiredAuthorization(endpoint, params, response);
      return this.checkErrorStatus(response?.data, options);
    }
    return this.checkErrorStatus(response, options);
  }

  private handleErrorRequest({ err, options }: { err: any; options: any }) {
    return this.checkErrorStatus(err?.response, options) || this.checkErrorNetwork(err);
  }

  get(endpoint: string, params: any = {}, options?: any, signal?: any) {
    return axios
      .get(endpoint, {
        params,
        headers: this.HEADERS,
        validateStatus: this.validateStatus,
        signal,
      })
      .then(
        (response) => this.handleSuccessRequest({ response, endpoint, params, options }),
        (err) => this.handleErrorRequest({ err, options }),
      )
      .catch((response) => {
        return response.data;
      });
  }

  post(endpoint: string, params?: any, options?: any, signal?: any) {
    return axios
      .post(endpoint, params, {
        headers: this.HEADERS,
        validateStatus: this.validateStatus,
        signal,
      })
      .then(
        (response) => this.handleSuccessRequest({ response, endpoint, params, options }),
        (err) => this.handleErrorRequest({ err, options }),
      )
      .catch((response) => {
        return response.data;
      });
  }

  postMultiplePart(endpoint: string, params?: any, options?: any) {
    return axios
      .post(endpoint, params, {
        headers: this.HEADERS_MULTIPLE_PART,
        validateStatus: this.validateStatus,
      })
      .then(
        (response) => this.handleSuccessRequest({ response, endpoint, params, options }),
        (err) => this.handleErrorRequest({ err, options }),
      )
      .catch((response) => {
        return response.data;
      });
  }

  put(endpoint: string, params?: any, options?: any, signal?: any) {
    return axios
      .put(endpoint, params, {
        headers: this.HEADERS,
        validateStatus: this.validateStatus,
        signal,
      })
      .then(
        (response) => this.handleSuccessRequest({ response, endpoint, params, options }),
        (err) => this.handleErrorRequest({ err, options }),
      )
      .catch((response) => {
        return response.data;
      });
  }

  patch(endpoint: string, params?: any, options?: any, signal?: any) {
    return axios
      .patch(endpoint, params, {
        headers: this.HEADERS,
        validateStatus: this.validateStatus,
        signal,
      })
      .then(
        (response) => this.handleSuccessRequest({ response, endpoint, params, options }),
        (err) => this.handleErrorRequest({ err, options }),
      )
      .catch((response) => {
        return response.data;
      });
  }

  patchMultipart(endpoint: string, params?: any, options?: any) {
    return axios
      .patch(endpoint, params, {
        headers: this.HEADERS_MULTIPLE_PART,
        validateStatus: this.validateStatus,
      })
      .then(
        (response) => this.handleSuccessRequest({ response, endpoint, params, options }),
        (err) => this.handleErrorRequest({ err, options }),
      )
      .catch((response) => {
        return response.data;
      });
  }

  delete(endpoint: string, params?: any, options?: any) {
    return axios
      .delete(endpoint, {
        params: params,
        headers: this.HEADERS,
        validateStatus: this.validateStatus,
      })
      .then(
        (response) => this.handleSuccessRequest({ response, endpoint, params, options }),
        (err) => this.handleErrorRequest({ err, options }),
      )
      .catch((response) => {
        return response.data;
      });
  }
}

export default ApiService;
