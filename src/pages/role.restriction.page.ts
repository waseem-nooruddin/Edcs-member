import { Page, Locator } from "@playwright/test";

export class RoleRestrictionPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickRoleRestriction(): Promise<void> {
    await this.page.getByRole("button", { name: "Role Restrictions" }).click();
  }

  async searchRoleRestriction(listNumber: string): Promise<void> {
    await this.page.locator("#root_userRoleId").click();
    await this.page.getByRole("option", { name: "EDCS Admin Role" }).click();
  }
  async checkboxSelection(): Promise<void> {
    const checkbox = this.page.getByRole("checkbox");
  }

  async enterSubmitButton(): Promise<void> {
    await this.page.getByRole("button", { name: "Submit" }).click();
  }

  async enterRemoveExistingId(): Promise<void> {
    await this.page.getByRole("button", { name: "Reject" }).first().click();
  }
}