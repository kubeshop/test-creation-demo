import { test as base, expect, type Locator, type Page } from '@playwright/test';

/** Thin page object for the TodoMVC React example. Selectors use the app's data-testid attributes. */
export class TodoApp {
  readonly newTodo: Locator;
  readonly items: Locator;
  readonly labels: Locator;
  readonly toggleAll: Locator;
  readonly counter: Locator;
  readonly clearCompleted: Locator;

  constructor(readonly page: Page) {
    this.newTodo = page.getByTestId('header').getByTestId('text-input');
    this.items = page.getByTestId('todo-item');
    this.labels = page.getByTestId('todo-item-label');
    this.toggleAll = page.getByTestId('toggle-all');
    this.counter = page.locator('.todo-count');
    this.clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() {
    await this.page.goto('./');
    await expect(this.newTodo).toBeVisible();
  }

  async add(...titles: string[]) {
    for (const title of titles) {
      await this.newTodo.fill(title);
      await this.newTodo.press('Enter');
    }
  }

  item(title: string): Locator {
    return this.items.filter({ has: this.page.getByTestId('todo-item-label').getByText(title, { exact: true }) });
  }

  filter(name: 'All' | 'Active' | 'Completed'): Locator {
    return this.page.getByTestId('footer-navigation').getByRole('link', { name });
  }
}

/** Use `test` from here instead of @playwright/test to get a `todo` fixture on a fresh, loaded app. */
export const test = base.extend<{ todo: TodoApp }>({
  todo: async ({ page }, use) => {
    const todo = new TodoApp(page);
    await todo.goto();
    await use(todo);
  },
});

export { expect };
