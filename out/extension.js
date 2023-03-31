"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const ViewLoader_1 = require("./view/ViewLoader");
function activate(context) {
    console.log('Congratulations, your extension "flutter-arb" is now active!');
    let disposable = vscode.commands.registerCommand('flutter-arb.editor', () => new ViewLoader_1.default(context.extensionUri));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map