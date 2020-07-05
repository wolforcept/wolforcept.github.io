"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerTextEditorCommand('bigtext.bigtext', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World from Big Text!');
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        let range = new vscode.Range(editor.selection.start, editor.selection.end);
        let oldText = editor.document.getText(range);
        let newText = toBigText(oldText.toLowerCase());
        if (range.start.character != 0)
            newText = "\n" + newText;
        editor.edit((editBuilder) => { editBuilder.replace(range, newText); });
        vscode.window.showInformationMessage(`replaced ${oldText} with:\n${newText}`);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
const bigtextSource1 = "▄▀▄   ██▄   ▄▀▀   █▀▄   ██▀   █▀    ▄▀    █▄█   █       █   █▄▀   █     █▄ ▄█ █▄ █  ▄▀▄   █▀▄   ▄▀▄   █▀▄   ▄▀▀   ▀█▀   █ █   █ █   █   █ ▀▄▀   ▀▄▀   ▀█▀ ";
const bigtextSource2 = "█▀█   █▄█   ▀▄▄   █▄▀   █▄▄   █▀    ▀▄█   █ █   █     ▀▄█   █ █   █▄▄   █ ▀ █ █ ▀█  ▀▄▀   █▀    ▀▄█   █▀▄   ▄█▀    █    ▀▄█   ▀▄▀   ▀▄▀▄▀ █ █    █    █▄▄ ";
const lengths = [4, 4, 4, 4, 4, 3, 4, 4, 2, 4, 4, 4, 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 6, 4, 4, 4];
function toBigText(text) {
    let line1 = "";
    let line2 = "";
    for (var i = 0; i < text.length; i++) {
        // SPACE
        if (text.charCodeAt(i) == 32) {
            line1 += "   ";
            line2 += "   ";
            continue;
        }
        let charIndex = text.charCodeAt(i) - "a".charCodeAt(0);
        if (charIndex > 25 || charIndex < 0)
            continue;
        let length = lengths[charIndex];
        for (let l = 0; l < length; l++) {
            line1 += bigtextSource1[charIndex * 6 + l];
            line2 += bigtextSource2[charIndex * 6 + l];
        }
    }
    return line1 + "\n" + line2;
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map