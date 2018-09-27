import { RippsPage } from './app.po';

describe('ripps App', () => {
  let page: RippsPage;

  beforeEach(() => {
    page = new RippsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
