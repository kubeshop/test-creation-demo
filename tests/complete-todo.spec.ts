import { test, expect } from './support/todo-app';

test.describe('Complete todo', () => {
  test('marks a todo as completed and decrements the counter', async ({ todo }) => {
    await todo.add('buy groceries', 'walk the dog');

    const item = todo.item('buy groceries');
    await item.getByTestId('todo-item-toggle').check();

    await expect(item).toHaveClass(/completed/);
    await expect(todo.counter).toContainText('1 item left');
  });

  test('toggle-all marks every todo completed, and clicking again un-marks them', async ({ todo }) => {
    await todo.add('buy groceries', 'walk the dog');

    await todo.toggleAll.check();
    await expect(todo.items).toHaveClass(/completed/);
    await expect(todo.counter).toContainText('0 items left');

    await todo.toggleAll.uncheck();
    await expect(todo.items).not.toHaveClass(/completed/);
    await expect(todo.counter).toContainText('2 items left');
  });
});
