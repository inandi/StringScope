# StringScope - Technical Documentation

**Version:** 0.0.1  
**Last Updated:** 07-12-2025  
**Author:** Gobinda Nandi <01ampoule_zero@icloud.com>

## Overview

StringScope is a VS Code extension that provides real-time string analysis capabilities. It displays string length information in the status bar and offers detailed character-level analysis including index positions, ASCII values, Unicode code points, and character classifications.

## Architecture

### Core Components

#### 1. Extension Entry Point (`extension.ts`)

The main extension module handles:
- Extension activation and deactivation
- Status bar item management
- Event listener registration
- Command registration

**Key Variables:**
- `statusBarItem`: VS Code status bar item instance
- `currentStringContent`: Extracted string content (without quotes) for quoted strings
- `currentSelectedText`: Currently selected text (raw selection)

#### 2. String Extraction Module

**Function:** `extractStringContent(text: string): string | null`

- **Purpose:** Extracts string content from quoted text selections
- **Supported Formats:**
  - Double quotes: `"text"`
  - Single quotes: `'text'`
  - Multiline strings (both quote types)
- **Returns:** String content without quotes, or `null` if not a valid quoted string

**Algorithm:**
1. Validates input (minimum 2 characters for quotes)
2. Checks for double quote wrapper
3. Checks for single quote wrapper
4. Returns extracted content or null

#### 3. Status Bar Update Module

**Function:** `updateStatusBar(): void`

- **Purpose:** Updates the status bar based on current text selection
- **Behavior:**
  - Hides status bar when no selection exists
  - Shows length for any selected text
  - For quoted strings: displays content length (without quotes)
  - For regular text: displays selection length
- **Event Triggers:**
  - Text selection changes (keyboard/mouse)
  - Active editor changes
  - Initial activation

#### 4. Character Analysis Module

**Function:** `getCharacterName(char: string, charCode: number): string`

- **Purpose:** Provides human-readable names for characters
- **Character Classifications:**
  - Control characters (Space, LF, CR, Tab, etc.)
  - Printable ASCII (32-126)
  - Non-printable characters
- **Special Character Handling:**
  - Space → "Space"
  - `\n` → "Line Feed (LF)"
  - `\r` → "Carriage Return (CR)"
  - `\t` → "Horizontal Tab"
  - `\v` → "Vertical Tab"
  - `\f` → "Form Feed"
  - `\b` → "Backspace"
  - `\0` → "Null"

#### 5. Character Details Display Module

**Function:** `showDetailedTooltip(): void`

- **Purpose:** Displays comprehensive character information in a QuickPick dialog
- **Information Displayed:**
  - Index position (0-based)
  - Display character (with special character symbols)
  - ASCII value (if applicable)
  - Unicode code point (U+XXXX format)
  - Character name/classification
  - Decimal value
  - Hexadecimal value (0xXX format)

**Display Format:**
- **Label:** `{index}: {displayChar}`
- **Description:** `ASCII: {value} | U+{unicode}`
- **Detail:** `{name} | Decimal: {value} | Hex: 0x{value}`

**Special Character Symbols:**
- Space: `␣`
- Newline: `↵`
- Tab: `⇥`
- Null: `␀`
- Non-printable: `[{code}]`

## Data Flow

```
User Selection
    ↓
onDidChangeTextEditorSelection Event
    ↓
updateStatusBar()
    ↓
extractStringContent() [if quoted]
    ↓
Update Status Bar Item
    ↓
User Clicks Status Bar
    ↓
showDetailedTooltip()
    ↓
getCharacterName() [for each character]
    ↓
Display QuickPick with Character Details
```

## Event Listeners

### 1. Selection Change Listener
```typescript
vscode.window.onDidChangeTextEditorSelection(() => {
    updateStatusBar();
});
```
- **Trigger:** Any text selection change (keyboard or mouse)
- **Action:** Updates status bar with current selection length

### 2. Active Editor Change Listener
```typescript
vscode.window.onDidChangeActiveTextEditor(() => {
    updateStatusBar();
});
```
- **Trigger:** When switching between editors
- **Action:** Updates status bar for new editor's selection

## Commands

### `stringscope.showCharacterIndices`
- **Purpose:** Displays character details dialog
- **Trigger:** Click on status bar item
- **Action:** Calls `showDetailedTooltip()`

## Status Bar Item

- **Alignment:** Right
- **Priority:** 100
- **Visibility:** Hidden when no selection, shown when text is selected
- **Format:** `$(symbol-string) StringScope: {length}`
- **Tooltip:** "Click to view character details (index, ASCII, Unicode)"

## Dependencies

### Runtime Dependencies
- `vscode`: VS Code Extension API (provided by VS Code)

### Development Dependencies
- `@types/vscode`: ^1.99.0
- `@types/node`: 20.x
- `typescript`: ^5.7.3
- `eslint`: ^9.21.0
- `@typescript-eslint/eslint-plugin`: ^8.25.0
- `@typescript-eslint/parser`: ^8.25.0
- `@vscode/test-cli`: ^0.0.10
- `@vscode/test-electron`: ^2.4.1

## File Structure

```
StringScope/
├── src/
│   ├── extension.ts          # Main extension module
│   └── test/
│       └── extension.test.ts # Unit tests
├── out/                      # Compiled JavaScript
├── doc/
│   ├── TECHNICAL.md          # This file
│   └── PROCESS.md            # Development process
├── package.json              # Extension manifest
├── tsconfig.json             # TypeScript configuration
└── README.md                 # User documentation
```

## TypeScript Configuration

- **Module System:** Node16
- **Target:** ES2022
- **Strict Mode:** Enabled
- **Source Maps:** Enabled
- **Output Directory:** `out/`

## Performance Considerations

1. **Event Handling:** Selection change events fire frequently; `updateStatusBar()` is lightweight
2. **Memory:** Minimal state maintained (3 variables)
3. **UI Updates:** Status bar updates are efficient; QuickPick creation is on-demand
4. **Character Analysis:** Performed only when user clicks status bar (lazy evaluation)

## Limitations

1. **Quote Detection:** Only detects strings that start and end with the same quote type
2. **Character Encoding:** Assumes UTF-16 encoding (JavaScript default)
3. **Large Strings:** QuickPick may have performance issues with very long strings (>1000 characters)
4. **Multiline Display:** Special characters in multiline strings may display differently

## Future Enhancements

- Support for template literals (backticks)
- Character frequency analysis
- String comparison utilities
- Export character details to file
- Customizable status bar format
- Support for different character encodings

