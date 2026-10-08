import { test, expect } from './support/todo-app';

test.describe('Filters', () => {
  test('Active and Completed filters show only matching todos', async ({ todo }) => {
    await todo.add('buy milk', 'walk the dog', 'write tests');
    await todo.item('buy milk').getByTestId('todo-item-toggle').check();

    await todo.filter('Active').click();
    await expect(todo.item('buy milk')).toHaveCount(0);
    await expect(todo.item('walk the dog')).toBeVisible();
    await expect(todo.item('write tests')).toBeVisible();
    await expect(todo.filter('Active')).toHaveClass(/selected/);

    await todo.filter('Completed').click();
    await expect(todo.item('buy milk')).toBeVisible();
    await expect(todo.item('walk the dog')).toHaveCount(0);
    await expect(todo.item('write tests')).toHaveCount(0);
    await expect(todo.filter('Completed')).toHaveClass(/selected/);

    await todo.filter('All').click();
    await expect(todo.labels).toHaveText(['buy milk', 'walk the dog', 'write tests']);
    await expect(todo.filter('All')).toHaveClass(/selected/);
  });
});
