import { expect, type Locator, type Page } from "@playwright/test";

export class epik {
  readonly page: Page;
  readonly logo: Locator;
  readonly searchField: Locator;
  readonly loginBtn: Locator;
  readonly searchBtn: Locator;
  readonly titleSearchProd: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole("img", { name: "Епіцентр" });
    this.searchField = page.getByPlaceholder("Пошук");
    this.loginBtn = page.locator("#global-site-header").getByText("Увійти");
    this.searchBtn = page.locator("xpath=//button[@class='_cvO7u1']");
    this.titleSearchProd = page.getByText('"artline gaming d31"');
  }

  async goto() {
    await this.page.goto("https://epicentrk.ua/");
  }

  async mainIsVisible() {
    await this.goto();
    await this.logo.isVisible();
    await this.searchField.isVisible();
    await this.loginBtn.isVisible();
  }

  async tabFirst() {
    await this.searchField.isVisible();
    await this.searchField.pressSequentially("Artline Gaming D31");
    await this.searchBtn.click();
    await this.titleSearchProd.click();
  }
}