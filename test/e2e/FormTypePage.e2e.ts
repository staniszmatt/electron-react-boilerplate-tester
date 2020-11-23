/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { ClientFunction, Selector } from 'testcafe';

const getPageUrl = ClientFunction(() => window.location.href);
const formTypePage = Selector('[data-tid="formTypesPage"]');
const formFields = Selector('[data-tid="formTypesPage"]');


// const navbarSelector = Selector('[data-tid="navbar"]');
const formTypesBtn = Selector('[data-tid="navbar"] > a').nth(2);
const clickToFormType = (t) =>
  t.click(formTypesBtn.withExactText('Form Types'));

const inputSelector = Selector('[data-tclass="input"]');

const textArea1 = inputSelector.child().nth(0);
const textArea2 = inputSelector.child().nth(1);

const input1 = inputSelector.child().nth(2);
const input2 = inputSelector.child().nth(3);
const input3 = inputSelector.child().nth(4);

const optionMenu1 = inputSelector.child().nth(5);
const optionMenu2 = inputSelector.child().nth(6);

const radioBtnOpt1 = inputSelector.child().nth(7);
const radioBtnOpt2 = inputSelector.child().nth(8);

const checkBoxOpt1 = inputSelector.child().nth(9);
const checkBoxOpt2 = inputSelector.child().nth(10);

// Run assertNoConsoleErrors method after each test including new testing to verify no error messages
const assertNoConsoleErrors = async (t) => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Form Type Test`
  .page('../../app/app.html')
  .beforeEach(clickToFormType)
  .afterEach(assertNoConsoleErrors);

test(
  'should not have any logs in console of main window',
  assertNoConsoleErrors
);

test('should count 11 input field type options with specific labels', async (t) => {
  await t.expect(inputSelector.count).eql(11);
});

test('should display specific default text and labels in both textarea input', async (t) => {
  await t
    .expect(textArea1.child('div:first-child').child('label').textContent)
    .contains('Text Area Field 1:');
  await t
    .expect(textArea1.child('div:last-child').child('textarea').textContent)
    .contains('Test Default 1');
  await t
    .expect(textArea2.child('div:last-child').child('textarea').textContent)
    .contains('Test Default 2');
  await t
    .expect(textArea2.child('div:first-child').child('label').textContent)
    .contains('Text Area Field 2:');
});

test('should display specific default text and labels in three  input fields', async (t) => {
  await t
    .expect(input1.child('label').textContent)
    .contains('Input Field 1 (Cap Lock):');
  await t.expect(input1.child('input').textContent).contains('DEFAULT 1');
});
