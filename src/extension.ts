import * as vscode from 'vscode';
import ViewLoader, { initViewLoader } from './view/ViewLoader';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'flutter-arb.editor',
    async () => await initViewLoader(context.extensionUri)
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
