import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.copyVisibleText', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            if (selection && !selection.isEmpty) {
                const visibleRanges = editor.visibleRanges;
                let visibleText = '';

                // Get all visible ranges that intersect with the selection
                const intersectingRanges = visibleRanges.filter(range => range.intersection(selection));

                for (const range of intersectingRanges) {
                    const intersectionRange = range.intersection(selection);
                    if (intersectionRange) {
                        visibleText += editor.document.getText(intersectionRange);
                    }
                }

                if (visibleText) {
                    vscode.env.clipboard.writeText(visibleText);
                    vscode.window.showInformationMessage('Selected visible text copied to clipboard!');
                } else {
                    vscode.window.showInformationMessage('No visible text selected.');
                }
            } else {
                vscode.window.showInformationMessage('Please select some text first.');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
