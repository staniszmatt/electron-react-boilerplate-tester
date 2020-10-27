/* eslint-disable prettier/prettier */
/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { ClientFunction, Selector } from 'testcafe';

const getPageUrl = ClientFunction(() => window.location.href);
const getPageTitle = ClientFunction(() => document.title);

const counterSelector = Selector('[data-tid="counter"]');
const homeSelector = Selector('[data-tid="home"]');
const formTypesSelector = Selector('[data-tid="formTypes"]');

const buttonsSelector = Selector('[data-tclass="btn"]');

const clickToCounterLink = (t) =>
  t.click(Selector('a').withExactText('to Counter'));
const clickToHomePageLink = (t) => t.click(Selector('a').withExactText('Home'));
const clickToFormTypesPageLink = (t) =>
  t.click(Selector('a').withExactText('Form Types'));


const assertNoConsoleErrors = async (t) => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);
fixture`Counter Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);
fixture`Form Types Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);
