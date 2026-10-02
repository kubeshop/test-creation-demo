import { test, expect } from './support/todo-app';

test.describe('Clear completed', () => {
  test('removes completed todos and hides the button when none are left', async ({ todo }) => {
    // Intent: "Clear completed" deletes only completed items, then disappears.
    await todo.add('buy milk', 'write tests', 'take a walk');

    // Complete two items.
    await expect(todo.item('buy milk')).toBeVisible();
    await expect(todo.item('write tests')).toBeVisible();

    await todo.item('buy milk').getByTestId('todo-item-toggle').check();
    await todo.item('write tests').getByTestId('todo-item-toggle').check();

    // "Clear completed" should be available when at least one item is completed.
    await expect(todo.clearCompleted).toBeVisible();

    await todo.clearCompleted.click();

    // Only the completed items are removed.
    await expect(todo.item('buy milk')).toHaveCount(0);
    await expect(todo.item('write tests')).toHaveCount(0);
    await expect(todo.item('take a walk')).toBeVisible();

    // With no completed items left, the button disappears.
    await expect(todo.clearCompleted).toBeHidden();
  });
});
