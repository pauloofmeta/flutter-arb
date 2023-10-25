import * as vscode from 'vscode';
import ViewLoader from './ViewLoader';
import { COMMAND } from './constants';

export function activate(context: vscode.ExtensionContext) {
  const viewLoader = new ViewLoader(context.extensionUri);
  let currentPanel: vscode.WebviewPanel | null = null;

  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND.WEB_VIEW_PANEL, async () => {
      if (currentPanel) {
        currentPanel.reveal(vscode.ViewColumn.One);
      } else {
        currentPanel = await viewLoader.initialize();
      }
    })
  );
}
