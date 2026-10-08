import { test, expect } from './support/todo-app';

test.describe('Complete todo', () => {
  test('marks a todo as completed and decrements the counter', async ({ todo }) => {
    await todo.add('buy milk', 'walk the dog');

    await expect(todo.counter).toHaveText('2 items left!');
    await todo.item('buy milk').getByTestId('todo-item-toggle').check();

    await expect(todo.item('buy milk')).toHaveClass(/completed/);
    await expect(todo.counter).toHaveText('1 item left!');
  });

  test('toggle-all marks every todo completed, and clicking again un-marks them', async ({ todo }) => {
    await todo.add('buy milk', 'walk the dog');

    await expect(todo.counter).toHaveText('2 items left!');
    await todo.toggleAll.check();

    await expect(todo.item('buy milk')).toHaveClass(/completed/);
    await expect(todo.item('walk the dog')).toHaveClass(/completed/);
    await expect(todo.counter).toHaveText('0 items left!');

    await todo.toggleAll.uncheck();

    await expect(todo.item('buy milk')).not.toHaveClass(/completed/);
    await expect(todo.item('walk the dog')).not.toHaveClass(/completed/);
    await expect(todo.counter).toHaveText('2 items left!');
  });
});
