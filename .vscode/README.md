# VS Code / Cursor Settings Documentation

## Known Issues and Fixes

### editor.codeActionsOnSave Type Error

**Problem:**
Settings validation error showing:
```
Incorrect type. Expected "string". (settings.json)
```
for the `editor.codeActionsOnSave` setting.

**Fix:**
Change the `source.fixAll` value from a boolean to a string:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"  // Use "explicit" instead of true
  }
}
```

**Explanation:**
While older versions of VS Code accepted a boolean value for this setting, newer versions require a string value. Valid options include:
- `"explicit"`: Run code actions only when explicitly requested
- `"never"`: Never run code actions
- `"onSave"`: Run code actions on save

## Additional Settings Notes

- File-related boolean settings (like `files.trimTrailingWhitespace`) should remain boolean values
- Language-specific settings use the pattern `"[language]": { ... }`
- EOL settings can be `"\n"` for LF or `"\r\n"` for CRLF
