import * as vscode from 'vscode';

const extractLangFromPath = (path: string): string => {
  const fileName = path.substring(path.lastIndexOf('/') + 1, path.length + 1);

  return fileName.substring(0, fileName.indexOf('.arb'));
};

const readArbFiles = async (): Promise<[string[], any[]]> => {
  const files = await vscode.workspace.findFiles('**/l10n/*.arb', null, 100);

  let resources: any[] = [];
  const langs: string[] = [];
  for (const file of files) {
    const lang = extractLangFromPath(file.path);
    if (!langs.includes(lang)) langs.push(lang);
    const fileDocument = await vscode.workspace.openTextDocument(file);
    const content = JSON.parse(fileDocument.getText());

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

export const initViewLoader = async (
  extensionUri: vscode.Uri
): Promise<any> => {
  const [langs, resources] = await readArbFiles();
  return new ViewLoader(extensionUri);
};

export default class ViewLoader {
  private readonly _extensionUri: vscode.Uri;
  private readonly _panel: vscode.WebviewPanel | undefined;

  constructor(extensionUri: vscode.Uri) {
    this._extensionUri = extensionUri;

    this._panel = vscode.window.createWebviewPanel(
      'arb-editor',
      'Flutter Arb Editor',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(this._extensionUri, 'arbEditor'),
          vscode.Uri.joinPath(
            this._extensionUri,
            'node_modules',
            '@vscode/codicons',
            'dist'
          ),
        ],
      }
    );

    this._panel.webview.html = this.getWebViewContent(this._panel.webview);
  }

  private getWebViewContent(webview: vscode.Webview): string {
    const reactAppPathOnDisk = vscode.Uri.joinPath(
      this._extensionUri,
      'arbEditor',
      'arbEditor.js'
    );

    const reactAppUri = webview.asWebviewUri(reactAppPathOnDisk);
    const nonce = this.getNonce();

    const codiconsUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        'node_modules',
        '@vscode/codicons',
        'dist',
        'codicon.css'
      )
    );

    return `<!DOCTYPE html>
        <html lang="eng">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Flutter Arb Editor</title>

            <meta http-equiv="Content-Security-Policy"
                    content="default-src 'none';
                        font-src ${webview.cspSource} 'unsafe-inline';
                        img-src ${webview.cspSource} https:;
                        script-src 'unsafe-eval' 'unsafe-inline' ${webview.cspSource};
                        style-src ${webview.cspSource} 'unsafe-inline';">
            
            <link href="${codiconsUri}" rel="stylesheet" />
            
            <script>
                window.acquireVsCodeApi = acquireVsCodeApi;
            </script>
        </head>
        <body>
            <div id="root"></div>

            <script nonce="${nonce}" src="${reactAppUri}"></script>
        </body>
        </html>`;
  }

  private getNonce() {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
