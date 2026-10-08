import { test, expect } from './support/todo-app';

test.describe('Delete todo', () => {
  test('the destroy button removes only that todo', async ({ todo }) => {
    await todo.add('buy milk', 'walk the dog', 'write tests');

    await expect(todo.item('buy milk')).toBeVisible();
    await expect(todo.item('walk the dog')).toBeVisible();
    await expect(todo.item('write tests')).toBeVisible();

    const doomedItem = todo.item('walk the dog');
    await doomedItem.hover();
    await doomedItem.getByTestId('todo-item-button').click();

    await expect(todo.item('buy milk')).toBeVisible();
    await expect(todo.item('walk the dog')).toHaveCount(0);
    await expect(todo.item('write tests')).toBeVisible();
    await expect(todo.labels).toHaveText(['buy milk', 'write tests']);
  });
});
