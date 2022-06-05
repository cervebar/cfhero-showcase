import { device } from 'detox';

import { ComicReaderScreen, ComicShopHomeScreen, Flows, ScreenHeader } from '../helpers';
import { ui as comicShopHomeScreenUI } from '../helpers/screens/ComicShopHomeScreen';

describe('User', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
    await Flows().goToComicShopHomeScreen();
  });

  it('should select user comic level 1', async () => {
    await ScreenHeader().checkOxygenAmount('200');
    await ComicShopHomeScreen().selectUserComicLevel();
  });

  it('should buy comic from Comic Shop', async () => {
    await ComicShopHomeScreen().checkComicItemPriceVisibility(
      comicShopHomeScreenUI.button.comicIcon2,
    );
    await ComicShopHomeScreen().buyComic();
  });

  it('should swipe to the end of the comic', async () => {
    await ComicReaderScreen().swipeComicToEnd();
  });

  it('should finish reading', async () => {
    await ComicReaderScreen().finishReading();
  });

  it('total oxygens amount should decrease', async () => {
    await ScreenHeader().checkOxygenAmount('0');
  });

  it('already bought comic icon should not contain price', async () => {
    await ComicShopHomeScreen().checkComicItemPriceVisibility(
      comicShopHomeScreenUI.button.comicIcon2,
      false,
    );
  });

  it('should not buy comic with not enough O2 account balance', async () => {
    await ComicShopHomeScreen().buyComicWithNotEnoughO2Balance();
  });
});
