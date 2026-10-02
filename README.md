# test-creation-demo

Playwright end-to-end tests for the [TodoMVC React example](https://todomvc.com/examples/react/dist/).
The suite is deliberately unfinished: a couple of tests are implemented, and the rest of the planned
coverage is declared with `test.fixme` so it shows up as pending work.

## Run

```sh
npm ci
npx playwright install --with-deps chromium
npm test                 # all specs, chromium only
npm run report           # open the HTML report
```

`BASE_URL` overrides the app under test (default `https://todomvc.com/examples/react/dist/`).
Reports: HTML in `playwright-report/`, JUnit in `test-results/junit.xml`, traces and screenshots for failures in `test-results/artifacts/`.

## Layout

| Path | What it holds |
| --- | --- |
| `playwright.config.ts` | baseURL, reporters, chromium project |
| `tests/support/todo-app.ts` | `TodoApp` page object and the `todo` fixture; import `test`/`expect` from here |
| `tests/<feature>.spec.ts` | one file per TodoMVC feature |

## Coverage

| Feature | Spec | Implemented | Pending (`test.fixme`) |
| --- | --- | --- | --- |
| Add | `add-todo.spec.ts` | add one todo; add several in order | |
| Complete | `complete-todo.spec.ts` | | complete one todo; toggle-all |
| Delete | `delete-todo.spec.ts` | | destroy button removes only that todo |
| Filters | `filters.spec.ts` | | Active/Completed subsets |
| Clear completed | `clear-completed.spec.ts` | | removes completed, hides button |

Each pending test has a one-line `// Intent:` comment describing what it should assert.
To implement one, replace `test.fixme` with `test`, take the `{ todo }` fixture, and follow the patterns in `add-todo.spec.ts`.

Not covered on purpose: persistence across reloads. This build of the React example keeps state in memory only, so todos are gone after a reload.
