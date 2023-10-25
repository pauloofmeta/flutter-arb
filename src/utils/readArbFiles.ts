import * as vscode from 'vscode';
import extractLangFromPath from './extractLangFromPath';

const readArbFiles = async (): Promise<[string[], any[]]> => {
  const files = await vscode.workspace.findFiles('**/l10n/*.arb', null, 100);

  let resources: any[] = [];
  const langs: string[] = [];
  for (const file of files) {
    const lang = extractLangFromPath(file.path);
    if (!langs.includes(lang)) {langs.push(lang);}
    const fileDocument = await vscode.workspace.openTextDocument(file);
    const fileContent = fileDocument.getText();
    if (fileContent === '') {continue;}
    const content = JSON.parse(fileContent);

    for (const key of Object.keys(content)) {
      const index = resources.findIndex((r) => r.key === key);
      if (index >= 0) {
        resources[index] = {
          ...resources[index],
          [lang]: content[key],
        };
      } else {
        resources.push({
          key: key,
          [lang]: content[key],
        });
      }
    }
  }

  return [langs, resources];
};

export default readArbFiles;
