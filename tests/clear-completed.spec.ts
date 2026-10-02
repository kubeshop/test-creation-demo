import { test, expect } from './support/todo-app';

test.describe('Clear completed', () => {
  test('removes completed todos and hides the button when none are left', async ({ todo }) => {
    // Arrange
    await todo.add('buy milk', 'write tests', 'walk dog');

    // Complete a couple items.
    await todo.item('write tests').getByTestId('todo-item-toggle').check();
    await todo.item('walk dog').getByTestId('todo-item-toggle').check();

    // "Clear completed" appears only when there are completed items.
    await expect(todo.clearCompleted).toBeVisible();

    // Counter reflects active items only.
    await expect(todo.counter).toContainText('1 item left');

    // Act
    await todo.clearCompleted.click();

    // Assert: completed items removed; active items remain.
    await expect(todo.items).toHaveCount(1);
    await expect(todo.labels).toHaveText(['buy milk']);

    // Counter updated.
    await expect(todo.counter).toContainText('1 item left');

    // "Clear completed" hidden again when no completed items remain.
    await expect(todo.clearCompleted).toBeHidden();
  });
});
