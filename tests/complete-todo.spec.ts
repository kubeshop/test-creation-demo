import { test, expect } from './support/todo-app';

test.describe('Complete todo', () => {
  test.fixme('marks a todo as completed and decrements the counter', async () => {
    // Intent: ticking an item's checkbox adds the "completed" class and "2 items left!" becomes "1 item left!".
  });

  test.fixme('toggle-all marks every todo completed, and clicking again un-marks them', async () => {
    // Intent: the "toggle-all" checkbox flips every item; the counter goes to "0 items left!" and back.
  });
});
