<div align="center">
  <h1>StringScope</h1>
  <p><strong>String Analysis Tool</strong></p>
</div>

Need to quickly check string length, character indices, or ASCII values? StringScope provides instant string analysis right in your VS Code/Cursor status bar with detailed character information at your fingertips!

## What is StringScope?

StringScope is a lightweight extension that helps you analyze selected text strings in real-time. Whether you're debugging string operations, working with character encodings, or just need to know the exact length of a string, StringScope displays all the information you need directly in your status bar.

## Why Use StringScope?

- **Instant Feedback**: See string length immediately when you select text
- **Character Details**: Click to view comprehensive character information including index positions, ASCII values, and Unicode code points
- **Works Everywhere**: Works with any text selection - regular text, multiline strings, or any characters
- **No Configuration**: Works out of the box with zero setup required
- **Clean UI**: Status bar indicator only appears when you need it

## Getting Started

### Installation

1. Open VS Code/Cursor
2. Go to the Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "StringScope"
4. Click Install

### First Steps

1. **Select Some Text**: Highlight any text in your editor
2. **See the Length**: Look at the bottom-right corner of VS Code (status bar) - you'll see `StringScope: [length]`
3. **View Details**: Click on the status bar indicator to see detailed character information
4. **Explore**: Try selecting different types of text:
   - Regular text: `Hello World`
   - Code snippets: `const x = 42;`
   - Multiline selections

## How It Works

### Status Bar Indicator

When you select text in your editor, StringScope automatically:
- Shows the total selection length in the status bar
- Treats every character equally (quotes, spaces, symbols - all counted)
- Hides automatically when nothing is selected

### Character Details Dialog

Click the status bar indicator to open a detailed character analysis dialog showing:

1. **Index Position**: Each character's position (0-based)
2. **Display Character**: The character itself (with special symbols for control characters)
3. **ASCII Value**: ASCII code for ASCII characters
4. **Unicode Code Point**: Unicode value in U+XXXX format
5. **Character Name**: Human-readable name (Space, Line Feed, Printable ASCII, etc.)
6. **Decimal Value**: Character code in decimal
7. **Hexadecimal Value**: Character code in hexadecimal (0xXX)

### Special Character Display

StringScope uses special symbols to visualize control characters:
- **Space**: `␣`
- **Newline**: `↵`
- **Tab**: `⇥`
- **Null**: `␀`
- **Non-printable**: `[code]`

### Example

Select the text `Hello` and you'll see:
- Status bar shows: `StringScope: 5`
- Click to see:
  - `0: H` → ASCII: 72 | U+0048 → Printable ASCII | Decimal: 72 | Hex: 0x48
  - `1: e` → ASCII: 101 | U+0065 → Printable ASCII | Decimal: 101 | Hex: 0x65
  - `2: l` → ASCII: 108 | U+006C → Printable ASCII | Decimal: 108 | Hex: 0x6C
  - `3: l` → ASCII: 108 | U+006C → Printable ASCII | Decimal: 108 | Hex: 0x6C
  - `4: o` → ASCII: 111 | U+006F → Printable ASCII | Decimal: 111 | Hex: 0x6F

## Tips & Tricks

- **Quick Length Check**: Just select text to instantly see its length - no need to count characters manually
- **Debugging Strings**: Use character details to debug string encoding issues or verify special characters
- **Multiline Support**: Works perfectly with multiline strings - select across multiple lines to see the full length
- **Keyboard Selection**: Works with both mouse selection and keyboard selection (Shift+Arrow keys)
- **Any Text**: Works with any text selection - code, comments, strings, or plain text

## Use Cases

- **String Length Verification**: Quickly verify string lengths during development
- **Character Encoding Debugging**: Check ASCII and Unicode values when debugging encoding issues
- **String Manipulation**: Understand exact character positions when working with string operations
- **Code Review**: Verify string lengths and character composition during code reviews
- **Learning**: Explore character encodings and Unicode values interactively

## Support the Project

If StringScope has made your development workflow easier, consider supporting (No Pressure):

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/igobinda)

## Need Help?

- **Technical Documentation**: See [Technical Documentation](doc/TECHNICAL.md) for developers
- **Process Documentation**: See [Process Documentation](doc/PROCESS.md) for development workflows
- **Issues**: Found a bug or have a feature request? Open an issue on [GitHub](https://github.com/inandi/stringscope/issues)
- **Questions**: Check the documentation or open a discussion

## License

This project is licensed under the MIT License - feel free to use it however you'd like!

---

**Made with ❤️ by Gobinda Nandi**
