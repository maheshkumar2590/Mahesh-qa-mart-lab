---
name: failure-triage
description: Classify a failing Playwright test as App Bug, Test Bug, Test Data issue, Environment issue or Flaky, and draft a defect report. Use after a test run fails.
---
# Failure triage

1. Read the failure message, expected vs received, and the spec line.
2. Compare against the story/rules (`docs/stories`, `app/server.js` read-only).
3. Classify: **App Bug** (test matches the spec, app differs), **Test Bug** (test contradicts the spec), **Data** (stale user/stock/orders; consider reset), **Environment** (server down, port), **Flaky** (passes on repeat: `--repeat-each=5`).
4. For App Bugs write: title, steps, expected, actual, severity, evidence. Never fix `app/`; keep the test.
