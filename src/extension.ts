/**
 * StringScope Extension Main Module
 * 
 * VS Code extension for analyzing selected text strings with a status bar indicator.
 * Provides functionality to view string length, character indices, ASCII values, and Unicode information.
 * 
 * @author Gobinda Nandi <01ampoule_zero@icloud.com>
 * @since 0.0.1 [07-12-2025]
 * @version 2.0.0
 * @copyright (c) 2025 Gobinda Nandi
 */

import * as vscode from 'vscode';

// Status bar item for displaying string length
let statusBarItem: vscode.StatusBarItem;
let currentSelectedText: string | null = null;

/**
 * Updates the status bar based on current text selection.
 * Shows string length for any selected text, and hides the status bar when nothing is selected.
 * 
 * @returns {void}
 * @version 0.0.1
 */
function updateStatusBar(): void {
	if (!statusBarItem) {
		return;
	}

	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		currentSelectedText = null;
		statusBarItem.hide();
		return;
	}

	const selection = editor.selection;

	// Check if there's an actual selection (not just a cursor)
	if (selection.isEmpty) {
		currentSelectedText = null;
		statusBarItem.hide();
		return;
	}

	const selectedText = editor.document.getText(selection);
	currentSelectedText = selectedText;

	statusBarItem.text = `$(symbol-string) StringScope: ${selectedText.length}`;
	statusBarItem.tooltip = `Click to view character details (index, ASCII, Unicode)`;
	statusBarItem.show();
}

/**
 * Gets a human-readable name or description for a character.
 * Identifies special control characters and categorizes printable vs non-printable characters.
 * 
 * @param {string} char - The character to get the name for
 * @param {number} charCode - The character code (Unicode/ASCII value)
 * @returns {string} A descriptive name for the character
 * @version 0.0.1
 */
function getCharacterName(char: string, charCode: number): string {
	if (char === ' ') {
		return 'Space';
	}
	if (char === '\n') {
		return 'Line Feed (LF)';
	}
	if (char === '\r') {
		return 'Carriage Return (CR)';
	}
	if (char === '\t') {
		return 'Horizontal Tab';
	}
	if (char === '\v') {
		return 'Vertical Tab';
	}
	if (char === '\f') {
		return 'Form Feed';
	}
	if (char === '\b') {
		return 'Backspace';
	}
	if (char === '\0') {
		return 'Null';
	}

	// Check if it's a printable ASCII character
	if (charCode >= 32 && charCode <= 126) {
		return 'Printable ASCII';
	}

	return 'Non-printable';
}

/**
 * Shows a detailed tooltip with all character information.
 * Displays a QuickPick dialog showing each character with its index position,
 * ASCII value, Unicode code point, character name, decimal, and hexadecimal values.
 * 
 * @returns {void}
 * @version 0.0.1
 */
function showDetailedTooltip(): void {
	if (!currentSelectedText) {
		return;
	}

	// Create a quick pick to display character details
	const quickPick = vscode.window.createQuickPick();
	quickPick.title = `StringScope - Character Details (Length: ${currentSelectedText.length})`;
	quickPick.placeholder = `Text: ${JSON.stringify(currentSelectedText)}`;

	const items: vscode.QuickPickItem[] = [];

	for (let i = 0; i < currentSelectedText.length; i++) {
		const char = currentSelectedText[i];
		const charCode = char.charCodeAt(0);
		let displayChar: string;
		let description: string = '';
		let detail: string = '';

		// Format display character
		if (char === ' ') {
			displayChar = '␣';
		} else if (char === '\n') {
			displayChar = '↵';
		} else if (char === '\t') {
			displayChar = '⇥';
		} else if (char === '\r') {
			displayChar = '↵';
		} else if (char === '\0') {
			displayChar = '␀';
		} else if (charCode < 32 || charCode === 127) {
			displayChar = `[${charCode}]`;
		} else {
			displayChar = char;
		}

		// Build description with ASCII and Unicode info
		const asciiInfo = charCode <= 127 ? `ASCII: ${charCode}` : 'Non-ASCII';
		const unicodeInfo = `U+${charCode.toString(16).toUpperCase().padStart(4, '0')}`;
		const charName = getCharacterName(char, charCode);

		description = `${asciiInfo} | ${unicodeInfo}`;
		detail = `${charName} | Decimal: ${charCode} | Hex: 0x${charCode.toString(16).toUpperCase()}`;

		items.push({
			label: `${i}: ${displayChar}`,
			description: description,
			detail: detail
		});
	}

	quickPick.items = items;
	quickPick.canSelectMany = false;
	quickPick.show();

	// Clean up when done
	quickPick.onDidHide(() => quickPick.dispose());
}

/**
 * Activates the extension.
 * Sets up the status bar item, registers commands, and initializes selection listeners.
 * 
 * @param {vscode.ExtensionContext} context - The VS Code extension context
 * @returns {void}
 * @version 0.0.1
 */
export function activate(context: vscode.ExtensionContext): void {
	console.log('StringScope extension is now active!');

	// Create status bar item
	statusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
		100
	);
	statusBarItem.command = 'stringscope.showCharacterIndices';
	statusBarItem.hide();

	// Register command to show character indices
	const showIndicesCommand = vscode.commands.registerCommand(
		'stringscope.showCharacterIndices',
		() => {
			showDetailedTooltip();
		}
	);

	// Listen to selection changes (works for both keyboard and mouse)
	const selectionChangeDisposable = vscode.window.onDidChangeTextEditorSelection(() => {
		updateStatusBar();
	});

	// Listen to active editor changes
	const activeEditorDisposable = vscode.window.onDidChangeActiveTextEditor(() => {
		updateStatusBar();
	});

	// Initial update
	updateStatusBar();

	// Add all disposables
	context.subscriptions.push(
		statusBarItem,
		showIndicesCommand,
		selectionChangeDisposable,
		activeEditorDisposable
	);
}

/**
 * Deactivates the extension.
 * Cleans up resources when the extension is deactivated.
 * 
 * @returns {void}
 * @version 0.0.1
 */
export function deactivate(): void {
	if (statusBarItem) {
		statusBarItem.dispose();
	}
}
