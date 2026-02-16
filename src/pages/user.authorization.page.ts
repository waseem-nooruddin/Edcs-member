import { Page, Locator } from "@playwright/test";

export class UserAuthorization {
  constructor(private readonly page: Page) {}

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

  // async hoverPendingUser(): Promise<void> {
  //   await this.page.getByRole("row", { name: /Pending/i }).hover();
  // }

  async verifyPendingUser(): Promise<boolean> {
    return await this.page.getByRole("row", { name: /Pending/i }).isVisible();
  }

  async authorizeUser(): Promise<void> {
    await this.page.getByTitle("Authorize").first().click();
  }
}
