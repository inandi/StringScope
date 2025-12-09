# Release v1.1.1 - 2025-12-09

This release introduces below new features, performance improvements, and bug fixes.

## Bug Fixes
- Fix package

---

# Release v1.1.0 - 2025-12-09

This release introduces below new features, performance improvements, and bug fixes.

## Improvements
- Changed activation event from `"*"` to `"onStartupFinished"` to improve VS Code startup performance
- Extension now activates after VS Code finishes loading instead of immediately, reducing startup impact

---

# Release v1.0.1 - 2025-12-07

This release introduces the initial version of StringScope, a VS Code extension for analyzing selected text strings with real-time character information.

## New Features

### Status Bar Indicator
- Real-time string length display in the status bar
- Automatically appears when text is selected
- Hides when no text is selected (prevents UI clutter)
- Shows content length for quoted strings (without quotes)
- Shows selection length for regular text

### Character Analysis
- Click status bar to view detailed character information
- Character index positions (0-based)
- ASCII value display for ASCII characters
- Unicode code point information (U+XXXX format)
- Character name/classification (Space, Line Feed, Printable ASCII, etc.)
- Decimal and hexadecimal value representation
- Special character visualization with symbols:
  - Space: `␣`
  - Newline: `↵`
  - Tab: `⇥`
  - Null: `␀`

### String Support
- Works with any text selection (quoted or unquoted)
- Supports single quotes (`'text'`)
- Supports double quotes (`"text"`)
- Full multiline string support
- No minimum length requirement

## Improvements

- Efficient event handling for selection changes
- Lightweight status bar updates
- Lazy evaluation of character analysis (only when requested)
- Clean UI integration with VS Code status bar

## Bug Fixes

- Initial release - no bug fixes yet

## Deprecated Features

- None

## Known Issues

- Quote detection only works for strings that start and end with the same quote type
- Very long strings (>1000 characters) may have performance issues in the character details dialog
- Character encoding assumes UTF-16 (JavaScript default)

## Technical Details

- **VS Code Version:** Requires ^1.99.0 or higher
- **Activation:** Activates immediately on startup
- **Commands:** `stringscope.showCharacterIndices` - Shows character details dialog
- **Status Bar:** Right-aligned, priority 100

## Acknowledgments

- Built with VS Code Extension API
- TypeScript for type safety
- VS Code community for excellent extension development tools
