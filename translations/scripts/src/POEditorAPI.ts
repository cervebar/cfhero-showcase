import { API } from './API';

type PoeditorAPIReponse<T = any> = {
  response: {
    result: string;
    code: string;
    message: string;
  };
  result: T;
};
export type LanguagesResponse = {
  languages: {
    name: string;
    code: string;
    translations: number;
    percentage: number;
    updated: string;
  }[];
};

class POEditorAPI extends API {
  listProjectLanguages(projectId: string) {
    return this.post<LanguagesResponse>('/languages/list', { id: projectId });
  }

  generateProjectLanguageExportUrl(projectId: string, languageCode: string) {
    return this.post<{ url: string }>('/projects/export', {
      id: projectId,
      language: languageCode,
      type: 'json',
    });
  }

  post<T, R extends PoeditorAPIReponse<T> = PoeditorAPIReponse<T>>(
    path: string,
    body: Record<string, string | number>,
  ): Promise<R> {
    const bodyParams = new URLSearchParams({
      ...body,
      api_token: API_TOKEN,
    } as any);
    const requestInit = this.makePostRequestInit(bodyParams);
    return this.fetch<R>(path, {
      ...requestInit,
      headers: {
        ...requestInit.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}

export const poeditorApi = new POEditorAPI('https://api.poeditor.com/v2');
