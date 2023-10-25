import * as vscode from 'vscode';
import TYPES from './constants/types';
import NAME from './constants/name';
import { readArbFiles } from './utils';

class ViewLoader {
  private readonly _extensionUri: vscode.Uri;
  private _panel: vscode.WebviewPanel | undefined;

  constructor(extensionUri: vscode.Uri) {
    this._extensionUri = extensionUri;
  }

  async initialize() {
    await readArbFiles();
    this._panel = vscode.window.createWebviewPanel(
      TYPES.WEB_VIEW_TYPE,
      NAME.PANEL_NAME,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(this._extensionUri, 'dist'),
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

    return this._panel;
  }

  private getWebViewContent(webview: vscode.Webview): string {
    const reactAppPathOnDisk = vscode.Uri.joinPath(
      this._extensionUri,
      'dist',
      'bundle.js'
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
        </head>
        <body>
            <div id="root"></div>

            <script nonce="${nonce}">
              let vscode;

              if (typeof acquireVsCodeApi !== 'undefined') {
                vscode = acquireVsCodeApi;
              }
            </script>
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

export default ViewLoader;
