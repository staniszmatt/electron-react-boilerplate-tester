/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { ClientFunction, Selector } from 'testcafe';

const getPageUrl = ClientFunction(() => window.location.href);
const navbarSelector = Selector('[data-tid="navbar"]');
const homeBtn = Selector('[data-tid="navbar"] > a').nth(0);
const counterBtn = Selector('[data-tid="navbar"] > a').nth(1);
const formTypesBtn = Selector('[data-tid="navbar"] > a').nth(2);

// Run assertNoConsoleErrors method after each test including new testing to verify no error messages
const assertNoConsoleErrors = async (t) => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`App Main Page`
  .page('../../app/app.html')
  .afterEach(assertNoConsoleErrors);

test(
  'should not have any logs in console of main window',
  assertNoConsoleErrors
);

test('should verify navbar is present with three buttons', async (t) => {
  const navbarExists = navbarSelector.exists;
  await t.expect(navbarExists).ok();
  await t.expect(navbarSelector.child().count).eql(3);
});

test('should display navigate to navbar Counter button and navigate to /counter and still display the navbar', async (t) => {
  await t.click(counterBtn).expect(counterBtn.textContent).contains('Counter');
  await t.click(counterBtn).expect(getPageUrl()).contains('/counter');
});

test('should navigate to navbar Form Types button and navigate to /formTypes and still display the navbar', async (t) => {
  const navbarExists = navbarSelector.exists;
  await t.expect(navbarExists).ok();
  await t
    .click(formTypesBtn)
    .expect(formTypesBtn.textContent)
    .contains('Form Types');
  await t.click(formTypesBtn).expect(getPageUrl()).contains('/formTypes');
});

test('should navigate to navbar Home button and navigate to / and still display the navbar', async (t) => {
  const navbarExists = navbarSelector.exists;
  await t.expect(navbarExists).ok();
  await t.click(homeBtn).expect(homeBtn.textContent).contains('Home');
  await t.click(homeBtn).expect(getPageUrl()).contains('/');
});
