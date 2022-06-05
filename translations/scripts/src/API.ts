import fetch, { RequestInit } from 'node-fetch';

export class API {
  constructor(private apiUrl: string) {}

  get(path: string) {
    return this.fetch(path);
  }

  post(path: string, body?: any) {
    const bodyStr = JSON.stringify(body);
    const options: RequestInit = this.makePostRequestInit(bodyStr);
    return this.fetch(path, options);
  }

  protected makePostRequestInit(body: any) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    };
  }

  protected fetch<T = any>(path: string, options?: RequestInit): Promise<T> {
    const requestInit: RequestInit = {
      ...options,
      headers: {
        ...((options && options.headers) || {}),
      },
    };
    return fetch(`${this.apiUrl}${path}`, requestInit).then(res =>
      res.json().then(body => (res.status >= 400 ? Promise.reject(body) : (body as T))),
    );
  }
}
