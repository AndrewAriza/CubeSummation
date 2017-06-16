import { CubeSummationPage } from './app.po';

describe('cube-summation App', () => {
  let page: CubeSummationPage;

  beforeEach(() => {
    page = new CubeSummationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
