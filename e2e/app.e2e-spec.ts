import { Day3LlivePage } from './app.po';

describe('day3-llive App', () => {
  let page: Day3LlivePage;

  beforeEach(() => {
    page = new Day3LlivePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
