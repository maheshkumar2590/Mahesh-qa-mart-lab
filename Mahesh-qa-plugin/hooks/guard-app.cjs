// preToolUse guardrail: agents may edit only tests/, pages/ and Mahesh-qa-plugin/.
// Reads the tool event as JSON on stdin (toolName/toolArgs or tool_name/tool_input).
const fs = require('node:fs');
const path = require('node:path');

const ALLOWED = ['tests', 'pages', 'mahesh-qa-plugin'];
const EDIT_TOOL = /edit|create|write|replace|patch|insert/i;
const PATH_KEY = /^(path|filepath|file_path|file|uri)$/i;
const PATCH_HEADER = /^\*\*\* (?:Add|Update|Delete) File:[ \t]*([^\r\n]+)/gm;

function paths(value, out = []) {
  if (Array.isArray(value)) value.forEach((v) => paths(v, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (PATH_KEY.test(k) && typeof v === 'string') out.push(v.replace(/^file:\/\/\/?/, ''));
      else paths(v, out);
    }
  } else if (typeof value === 'string') {
    for (const m of value.matchAll(PATCH_HEADER)) out.push(m[1].trim());
  }
  return out;
}

function deny(reason) {
  process.stdout.write(JSON.stringify({
    permissionDecision: 'deny',
    permissionDecisionReason: reason,
    hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason },
  }));
  process.exit(0);
}

let event = {};
try { event = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { /* unreadable event = no edit */ }

const toolName = String(event.toolName ?? event.tool_name ?? '');
let args = event.toolArgs ?? event.tool_input ?? {};
if (typeof args === 'string') { try { args = JSON.parse(args); } catch { args = {}; } }

if (EDIT_TOOL.test(toolName)) {
  const root = path.resolve(event.cwd || process.cwd());
  for (const target of paths(args)) {
    const rel = path.relative(root, path.resolve(root, target));
    if (rel === '') continue;
    if (rel.startsWith('..') || path.isAbsolute(rel)) {
      deny(`Blocked: ${target} is outside the QA Mart repository.`);
    }
    const display = rel.split(path.sep).join('/');
    const first = display.split('/')[0].toLowerCase();
    if (first === 'app') {
      deny(`Blocked: ${display} is application source and read-only. Keep the failing test and report the bug instead.`);
    }
    if (!ALLOWED.includes(first)) {
      deny(`Blocked: ${display} is outside the editable folders (tests/, pages/, Mahesh-qa-plugin/).`);
    }
  }
}
process.stdout.write('{}');
