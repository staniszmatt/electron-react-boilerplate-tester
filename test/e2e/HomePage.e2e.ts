/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { ClientFunction, Selector } from 'testcafe';

const getPageUrl = ClientFunction(() => window.location.href);
const getPageTitle = ClientFunction(() => document.title);
const counterSelector = Selector('[data-tid="counter"]');
const buttonsSelector = Selector('[data-tclass="btn"]');
const clickToCounterLink = (t) =>
  t.click(Selector('a').withExactText('to Counter'));
const incrementButton = buttonsSelector.nth(0);
const decrementButton = buttonsSelector.nth(1);
const oddButton = buttonsSelector.nth(2);
const asyncButton = buttonsSelector.nth(3);
// Navbar Setup
const navbarSelector = Selector('[data-tid="navbar"]');
const homeBtn = Selector('[data-tid="navbar"] > a').nth(0);
const counterBtn = Selector('[data-tid="navbar"] > a').nth(1);
const formTypesBtn = Selector('[data-tid="navbar"] > a').nth(2);

const getCounterText = () => counterSelector().innerText;
// Run assertNoConsoleErrors method after each test including new testing to verify no error messages
const assertNoConsoleErrors = async (t) => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

// This will the assertNoConsoleErrors function after each test to verify no console log errors
fixture`App Main Page`
  .page('../../app/app.html')
  .afterEach(assertNoConsoleErrors);

test('e2e', async (t) => {
  await t.expect(getPageTitle()).eql('Electron-React Tester!');
});

test('should open window and contain expected page title', async (t) => {
  await t.expect(getPageTitle()).eql('Electron-React Tester!');
});

test(
  'should not have any logs in console of main window',
  assertNoConsoleErrors
);

// Navbar Testing Start
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

// Start of the counter page testing
test('should navigate to Counter with click on the "to Counter" link', async (t) => {
  await t.click('[data-tid=container] > a').expect(getCounterText()).eql('0');
});

test('should navigate to /counter', async (t) => {
  await t
    .click('[data-tid=container] > a')
    .expect(getPageUrl())
    .contains('/counter');
});

fixture`Counter Tests`
  .page('../../app/app.html')
  .beforeEach(clickToCounterLink)
  .afterEach(assertNoConsoleErrors);

test('should display updated count after the increment button click', async (t) => {
  await t.click(incrementButton).expect(getCounterText()).eql('1');
});

test('should display updated count after the decrement button click', async (t) => {
  await t.click(decrementButton).expect(getCounterText()).eql('-1');
});

test('should not change even counter if odd button clicked', async (t) => {
  await t.click(oddButton).expect(getCounterText()).eql('0');
});

test('should change odd counter if odd button clicked', async (t) => {
  await t
    .click(incrementButton)
    .click(oddButton)
    .expect(getCounterText())
    .eql('2');
});

test('should change if async button clicked and a second later', async (t) => {
  await t
    .click(asyncButton)
    .expect(getCounterText())
    .eql('0')
    .expect(getCounterText())
    .eql('1');
});

test('should back to home if back button clicked', async (t) => {
  await t
    .click('[data-tid="backButton"] > a')
    .expect(Selector('[data-tid="container"]').visible)
    .ok();
});
