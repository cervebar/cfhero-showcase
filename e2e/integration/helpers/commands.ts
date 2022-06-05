import assert from 'assert';

import { by, element, expect } from 'detox';
import { getText } from 'detox-getprops';

const assertTextIncludes = async (uiElement: string, textContent: string, index?: number) => {
  const text = await getText(element(by.id(uiElement)).atIndex(index | 0));
  assert(text.includes(textContent));
};

const tapElement = async (uiElement: string, index?: number) => {
  await element(by.id(uiElement))
    .atIndex(index | 0)
    .tap();
};

const fillInput = async (uiElement: string, text: string) => {
  await element(by.id(uiElement)).typeText(`${text}\n`);
};

const openScreen = async (uiElement: string, screen: string) => {
  await tapElement(uiElement);
  await isVisible(screen);
};

const isVisible = async (uiElement: string, invert?: boolean) => {
  if (invert === false) {
    await expect(element(by.id(uiElement))).toBeNotVisible();
  } else {
    await expect(element(by.id(uiElement))).toBeVisible();
  }
};

const convertConstantsTime = async (procedureMinTime: number) => {
  const minutes = Math.trunc(procedureMinTime / 60);
  const seconds = `${procedureMinTime - minutes * 60 + 2}`;
  if (seconds.length === 1) {
    return `0${minutes}:0${seconds}`;
  } else {
    return `0${minutes}:${seconds}`;
  }
};

export { assertTextIncludes, tapElement, isVisible, convertConstantsTime, openScreen, fillInput };
