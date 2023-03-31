"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ViewLoader {
    constructor(extensionUri) {
        this._extensionUri = extensionUri;
        this._panel = vscode.window.createWebviewPanel('arb-editor', 'Flutter Arb Editor', vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this._extensionUri, 'arbEditor'),
                vscode.Uri.joinPath(this._extensionUri, 'node_modules', '@vscode/codicons', 'dist')
            ]
        });
        this._panel.webview.html = this.getWebViewContent(this._panel.webview);
    }
    getWebViewContent(webview) {
        const reactAppPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'arbEditor', 'arbEditor.js');
        const reactAppUri = webview.asWebviewUri(reactAppPathOnDisk);
        const nonce = this.getNonce();
        const codiconsUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css'));
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
    getNonce() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
exports.default = ViewLoader;
//# sourceMappingURL=ViewLoader.js.map