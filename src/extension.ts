import * as vscode from 'vscode';
import ViewLoader from './view/ViewLoader';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "flutter-arb" is now active!');

	let disposable = vscode.commands.registerCommand('flutter-arb.editor', () => 
		new ViewLoader(context.extensionUri));

	context.subscriptions.push(disposable);
}

export function deactivate() {}
