import path from 'path';

import execa from 'execa';

import { downloadFile } from './downloadFile';
import { fetchLanguageExportUrls } from './fetchLanguageExportUrls';

const projectId = '490419';
const projectName = 'CFHero';
const languagesDirPath = path.join(__dirname, '..', '..', 'languages');
const convertAllLanguagesScriptPath = path.join(__dirname, '..', 'convertAllLanguages.sh');

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

export default async function main() {
  const languageExportUrls = await fetchLanguageExportUrls(projectId);

  await Promise.all(
    languageExportUrls.map(async ({ url, languageName }) => {
      const fileName = `${projectName}_${languageName}.json`;
      const filePath = path.join(languagesDirPath, fileName);
      return downloadFile(url, filePath);
    }),
  );

  const { stdout } = await execa(convertAllLanguagesScriptPath);
  console.log(stdout);
}
