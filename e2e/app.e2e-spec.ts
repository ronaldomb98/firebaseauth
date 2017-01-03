import { FirebaseauthPage } from './app.po';

describe('firebaseauth App', function() {
  let page: FirebaseauthPage;

  beforeEach(() => {
    page = new FirebaseauthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
