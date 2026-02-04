import { Page, Locator } from "@playwright/test";

export class ProductPage {
  constructor(private readonly page: Page) {}

  async getProductTitle(): Promise<string> {
    return (await this.page.locator(".title").textContent()) ?? "";
  }
}