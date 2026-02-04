import { Page, Locator } from "@playwright/test";

export class UserAuthorization {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickUserAuthorization(): Promise<void> {
    await this.page.getByRole("button", { name: "User Authorization" }).click();
  }

  async searchingUser(userId: string): Promise<void> {
    await this.page.locator("#outlined-basic").fill(userId);
  }

  async verifyUserAuthorizationPage(): Promise<boolean> {
    return await this.page
      .getByRole("heading", { name: "User Authorization" })
      .isVisible();
  }

  async verifyPendingUser(): Promise<boolean> { 
    return await this.page
      .getByRole("row", { name: /Pending/i })
      .isVisible();
  }

  async authorizeUser(): Promise<void> {
    await this.page.getByRole("button", { name: "Authorize" }).click();
  }


}