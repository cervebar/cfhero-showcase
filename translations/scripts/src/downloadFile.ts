import fs from 'fs';

import fetch from 'node-fetch';

export async function downloadFile(url: string, filePath: string) {
  const exportFileResponse = await fetch(url);
  if (!exportFileResponse.ok) {
    console.error(
      'Failed to download file',
      exportFileResponse.status,
      exportFileResponse.statusText,
    );
    console.error(await exportFileResponse.text());
    return;
  }
  return new Promise<void>((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath, 'utf8');
    exportFileResponse.body.pipe(writeStream);
    exportFileResponse.body.on('end', () => {
      console.log('Downloaded', filePath);
      resolve();
    });
    writeStream.on('error', reject);
  });
}
