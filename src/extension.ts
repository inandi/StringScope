// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Status bar item for displaying string length
let statusBarItem: vscode.StatusBarItem;
let currentStringContent: string | null = null;
let currentSelectedText: string | null = null;

/**
 * Extracts string content from selected text if it's a quoted string
 * @param text The selected text
 * @returns The string content without quotes, or null if not a valid string
 */
function extractStringContent(text: string): string | null {
	if (!text || text.length < 2) {
		return null;
	}

	// Check for double quotes (supports multiline)
	if (text.startsWith('"') && text.endsWith('"')) {
		return text.slice(1, -1);
	}
	
	// Check for single quotes (supports multiline)
	if (text.startsWith("'") && text.endsWith("'")) {
		return text.slice(1, -1);
	}
	
	return null;
}

/**
 * Updates the status bar based on current selection
 */
function updateStatusBar() {
	if (!statusBarItem) {
		return;
	}

	const editor = vscode.window.activeTextEditor;
	
	if (!editor) {
		currentStringContent = null;
		currentSelectedText = null;
		statusBarItem.hide();
		return;
	}

	const selection = editor.selection;
	
	// Check if there's an actual selection (not just a cursor)
	if (selection.isEmpty) {
		currentStringContent = null;
		currentSelectedText = null;
		statusBarItem.hide();
		return;
	}

	const selectedText = editor.document.getText(selection);
	currentSelectedText = selectedText;
	
	// Try to extract string content if it's a quoted string
	const stringContent = extractStringContent(selectedText);

	if (stringContent !== null) {
		// It's a quoted string - show length of content (without quotes) and enable click
		currentStringContent = stringContent;
		statusBarItem.text = `$(symbol-string) StringScope: ${stringContent.length}`;
		statusBarItem.tooltip = `Click to view character details (index, ASCII, Unicode)`;
		statusBarItem.show();
	} else {
		// It's not a quoted string - just show the length of selected text
		currentStringContent = null;
		statusBarItem.text = `$(symbol-string) StringScope: ${selectedText.length}`;
		statusBarItem.tooltip = `Click to view character details (index, ASCII, Unicode)`;
		statusBarItem.show();
	}
}

/**
 * Gets character name/description
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
 * Shows a detailed tooltip with all character indices, ASCII values, and other info
 */
function showDetailedTooltip() {
	// Use currentStringContent if it's a quoted string, otherwise use currentSelectedText
	const textToAnalyze = currentStringContent || currentSelectedText;
	
	if (!textToAnalyze) {
		return;
	}

	// Create a quick pick to display character details
	const quickPick = vscode.window.createQuickPick();
	const displayText = currentStringContent 
		? `"${currentStringContent}"` 
		: JSON.stringify(textToAnalyze);
	quickPick.title = `StringScope - Character Details (Length: ${textToAnalyze.length})`;
	quickPick.placeholder = `Text: ${displayText}`;
	
	const items: vscode.QuickPickItem[] = [];
	
	for (let i = 0; i < textToAnalyze.length; i++) {
		const char = textToAnalyze[i];
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

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
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

// This method is called when your extension is deactivated
export function deactivate() {
	if (statusBarItem) {
		statusBarItem.dispose();
	}
}
