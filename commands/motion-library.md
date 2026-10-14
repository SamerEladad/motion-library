---
description: Open the Motion Library dashboard in your browser
---

Open the Motion Library dashboard so I can browse the motion graphics and copy one.

Run this with the Bash tool. It finds the dashboard file inside the installed plugin and opens it (macOS, Linux and Windows/Git Bash):

```bash
FILE="${CLAUDE_PLUGIN_ROOT:-}/dashboard/index.html"
if [ ! -f "$FILE" ]; then
  FILE="$(find "$HOME/.claude/plugins" -path '*motion-library*' -name index.html -path '*dashboard*' 2>/dev/null | head -1)"
fi
if [ -z "$FILE" ] || [ ! -f "$FILE" ]; then echo "Motion Library dashboard not found"; exit 1; fi
if command -v open >/dev/null 2>&1; then open "$FILE"
elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$FILE"
else start "" "$FILE"; fi
echo "$FILE"
```

Then tell me in one line that the dashboard is open and that every card has a **Copy prompt** button. I paste the copied prompt back here and you build that exact motion graphic in my project. Do not list the graphics; the dashboard shows them.
