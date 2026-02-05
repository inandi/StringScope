# StringScope - Development Process Documentation

**Version:** 0.0.1  
**Last Updated:** 07-12-2025  
**Author:** Gobinda Nandi <01ampoule_zero@icloud.com>

## Development Workflow

### Prerequisites

1. **Node.js:** Version 20.x or higher
2. **VS Code:** Version 1.99.0 or higher
3. **npm:** Comes with Node.js

### Initial Setup

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch mode for development
npm run watch
```

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile TypeScript to JavaScript |
| `npm run watch` | Watch mode - auto-compile on changes |
| `npm run lint` | Run ESLint code analysis |
| `npm run pretest` | Compile and lint before testing |
| `npm test` | Run unit tests |
| `npm run vscode:prepublish` | Prepare for publishing (compile) |

### Testing the Extension

1. **Open Extension Development Host:**
   - Press `F5` in VS Code
   - Opens a new window with extension loaded

2. **Test Scenarios:**
   - Select regular text → Status bar shows length
   - Select quoted string → Status bar shows content length
   - Click status bar → Character details dialog opens
   - Deselect text → Status bar hides
   - Test with multiline strings
   - Test with special characters

3. **Debugging:**
   - Use VS Code debugger
   - Check Developer Console (`Help > Toggle Developer Tools`)
   - Console logs available in extension host

### Code Style Guidelines

#### Documentation Standards

All functions must include JSDoc comments following this format:

```typescript
/**
 * Brief description of the function.
 * Additional details about what the function does.
 * 
 * @param {Type} paramName - Description of parameter
 * @returns {Type} Description of return value
 * @since 0.0.1 [DD-MM-YYYY]
 * @version 0.0.1
 */
```

#### File Header Template

```typescript
/**
 * Module Name
 * 
 * Brief description of the module.
 * Additional context and purpose.
 * 
 * @author Gobinda Nandi <01ampoule_zero@icloud.com>
 * @since 0.0.1 [DD-MM-YYYY]
 * @version 0.0.1
 * @copyright © 2025 Gobinda Nandi. All rights reserved.
 */
```

#### Code Formatting

- Use 1 tab for indentation
- Maximum line length: 120 characters
- Use explicit return types
- Use `const` for variables that don't change
- Use `let` only when reassignment is needed
- Prefer early returns for error handling

#### Naming Conventions

- **Functions:** camelCase, descriptive verbs (`updateStatusBar`, `extractStringContent`)
- **Variables:** camelCase, descriptive nouns (`currentStringContent`, `statusBarItem`)
- **Constants:** UPPER_SNAKE_CASE (if needed)
- **Types/Interfaces:** PascalCase (if needed)

### Git Workflow

#### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature development branches
- `fix/*`: Bug fix branches

#### Commit Message Format

```
type(scope): brief description

Detailed explanation if needed.

- Bullet point for changes
- Another bullet point
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Maintenance tasks

**Example:**
```
feat(status-bar): add character details display

Added QuickPick dialog showing character indices, ASCII values,
and Unicode information when clicking status bar item.

- Implemented showDetailedTooltip() function
- Added getCharacterName() helper function
- Updated status bar tooltip text
```

### Version Management

#### Version Format

Follow Semantic Versioning (SemVer): `MAJOR.MINOR.PATCH`

- **MAJOR:** Breaking changes
- **MINOR:** New features (backward compatible)
- **PATCH:** Bug fixes (backward compatible)

#### Version Update Checklist

1. Update `package.json` version
2. Update `@since` tags in code documentation
3. Update `CHANGELOG.md`
4. Update version in `doc/TECHNICAL.md` and `doc/PROCESS.md`
5. Create git tag: `git tag -a v0.0.1 -m "Version 0.0.1"`

### Release Process

1. **Pre-Release:**
   ```bash
   # Ensure all tests pass
   npm run pretest
   
   # Compile for production
   npm run vscode:prepublish
   
   # Check for linting errors
   npm run lint
   ```

2. **Update Documentation:**
   - Update `CHANGELOG.md` with release notes
   - Update version numbers in all docs
   - Update date references

3. **Package Extension:**
   ```bash
   # Install vsce if not already installed
   npm install -g @vscode/vsce
   
   # Package extension
   vsce package
   ```

4. **Publish:**
   ```bash
   # Publish to VS Code Marketplace
   vsce publish
   ```

### Testing Strategy

#### Unit Tests

- Location: `src/test/extension.test.ts`
- Framework: Mocha
- Run: `npm test`

#### Manual Testing Checklist

- [ ] Status bar appears on text selection
- [ ] Status bar hides when no selection
- [ ] Correct length displayed for any text (all characters counted equally)
- [ ] Character details dialog opens on click
- [ ] All character information displays correctly
- [ ] Special characters display with symbols
- [ ] Multiline strings work correctly
- [ ] Works with both keyboard and mouse selection
- [ ] Works when switching between editors

### Code Review Process

1. **Self-Review:**
   - Check code follows style guidelines
   - Verify documentation is complete
   - Run linter and fix issues
   - Test functionality manually

2. **Pull Request:**
   - Create PR with descriptive title
   - Include detailed description
   - Link related issues
   - Request review

3. **Review Checklist:**
   - Code follows style guidelines
   - Documentation is complete and accurate
   - No linting errors
   - Tests pass
   - Functionality works as expected
   - No performance issues
   - Error handling is appropriate

### Issue Tracking

#### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or improvement
- `documentation`: Documentation improvements
- `question`: Questions or discussions
- `help wanted`: Extra attention needed

#### Bug Report Template

```markdown
**Description:**
Brief description of the bug

**Steps to Reproduce:**
1. Step one
2. Step two
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- VS Code Version: 
- Extension Version:
- OS:

**Screenshots:**
If applicable
```

### Maintenance

#### Regular Tasks

- Update dependencies monthly
- Review and update documentation
- Monitor issue tracker
- Review and optimize performance
- Update VS Code API usage as needed

#### Dependency Updates

```bash
# Check for outdated packages
npm outdated

# Update packages (carefully review breaking changes)
npm update

# Update specific package
npm install package@latest
```

### Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Semantic Versioning](https://semver.org/)

