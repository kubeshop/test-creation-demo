import { test, expect } from './support/todo-app';

test.describe('Add todo', () => {
  test('adds a single todo and clears the input', async ({ todo }) => {
    await todo.add('Buy milk');

    await expect(todo.labels).toHaveText(['Buy milk']);
    await expect(todo.newTodo).toHaveValue('');
    await expect(todo.counter).toHaveText('1 item left!');
  });

  test('adds several todos in the order they were entered', async ({ todo }) => {
    await todo.add('Buy milk', 'Walk the dog', 'Book flights');

    await expect(todo.labels).toHaveText(['Buy milk', 'Walk the dog', 'Book flights']);
    await expect(todo.counter).toHaveText('3 items left!');
  });
});
