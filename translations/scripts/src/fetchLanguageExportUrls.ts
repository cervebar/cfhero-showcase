import { poeditorApi } from './POEditorAPI';

export async function fetchLanguageExportUrls(projectId: string) {
  const languagesResponse = await poeditorApi.listProjectLanguages(projectId);
  const availableLanguages = languagesResponse.result.languages.map(({ code, name }) => ({
    languageCode: code,
    name,
  }));
  const exportUrlsResponses = await Promise.all(
    availableLanguages.map(async ({ languageCode, name }) => ({
      languageName: name,
      response: await poeditorApi.generateProjectLanguageExportUrl(projectId, languageCode),
    })),
  );
  return exportUrlsResponses.map(
    ({
      languageName,
      response: {
        result: { url },
      },
    }) => ({ languageName, url }),
  );
}
