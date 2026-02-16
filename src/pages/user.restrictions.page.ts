import { Page, Locator, expect } from "@playwright/test";

export class UserRestrictionsPage {
  constructor(private readonly page: Page) {}

  async selctBranch() {
    await this.page.locator("#root_branchId").click();
  }

  async selectBranchByName(branchName: string) {
    await this.page.getByRole("option", { name: branchName }).click();
  }

  async clickUserId() {
    await this.page.locator("#root_userId").click();
  }

  async selectUserId(userId: string) {
    await this.page.getByRole("option", { name: userId }).click();
  }

  async clickAdd() {
    await this.page.getByRole("button", { name: "Add" }).click();
  }
}
