// postToolUse check: warn about flaky or weak patterns in edited Playwright specs. Never blocks.
const fs = require('node:fs');
const path = require('node:path');

const PATH_KEY = /^(path|filepath|file_path|file|uri)$/i;
function paths(value, out = []) {
  if (Array.isArray(value)) value.forEach((v) => paths(v, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (PATH_KEY.test(k) && typeof v === 'string') out.push(v);
      else paths(v, out);
    }
  }
  return out;
}

try {
  const event = JSON.parse(fs.readFileSync(0, 'utf8'));
  let args = event.toolArgs ?? event.tool_input ?? {};
  if (typeof args === 'string') { try { args = JSON.parse(args); } catch { args = {}; } }
  const root = path.resolve(event.cwd || process.cwd());
  const warnings = [];

  for (const target of new Set(paths(args))) {
    if (!/\.spec\.ts$/.test(target)) continue;
    const file = path.resolve(root, target);
    if (!fs.existsSync(file)) continue;
    const src = fs.readFileSync(file, 'utf8');
    const name = path.basename(file);
    if (/waitForTimeout\(/.test(src)) warnings.push(`${name}: waitForTimeout found. Use web-first assertions.`);
    if (/page\.(locator|\$)\(\s*['"`]\/\//.test(src) || /xpath=/.test(src)) warnings.push(`${name}: XPath locator found. Prefer getByRole/getByLabel/getByTestId.`);
    if (!/expect\(/.test(src)) warnings.push(`${name}: no expect() assertion found.`);
  }

  process.stdout.write(warnings.length ? JSON.stringify({ additionalContext: warnings.join('\n') }) : '{}');
} catch {
  process.stdout.write('{}');
}
