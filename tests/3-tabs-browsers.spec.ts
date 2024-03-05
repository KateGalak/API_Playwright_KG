import { test, expect, chromium } from "@playwright/test";
import { epik } from "../page-object/page.ts";

test("Changes in two tabs", async ({ page, browser }) => {
  const site = new epik(page);
  let pageContext = await page.context();
  await site.mainIsVisible();
  await site.tabFirst();

  let tabSecond = await pageContext.newPage();
  await tabSecond.goto("https://epicentrk.ua/");
  await tabSecond
    .locator("xpath=//div[@class='header__menu-opener-button']")
    .click();
  await tabSecond.getByRole("link", { name: "Сад Город" }).click();
});

test("Changes in two browsers", async ({ browser }) => {
  const browserFirst = await chromium.launch();
  const contextFirst = await browserFirst.newContext();
  const pageFirst = await contextFirst.newPage();
  await pageFirst.goto("https://www.foxtrot.com.ua/");

  const browserSecond = await chromium.launch();
  const contextSecond = await browserSecond.newContext();
  const pageSecond = await contextSecond.newPage();
  await pageSecond.waitForTimeout(12000);
  await pageSecond.goto("https://allo.ua/");
});
