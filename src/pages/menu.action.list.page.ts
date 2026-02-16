import { Page, Locator } from "@playwright/test";

export class MenuActionListPage {
  constructor(private readonly page: Page) {}

  async clickMenuActionList(): Promise<void> {
    await this.page.getByRole("button", { name: "Menu Action List" }).click();
  }

  async searchMenuActionList(listNumber: string): Promise<void> {
    await this.page.locator("#outlined-basic").fill(listNumber);
    await this.page.fill("#outlined-basic", listNumber);
  }
}
