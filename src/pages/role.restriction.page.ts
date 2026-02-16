import { Page, Locator } from "@playwright/test";

export class RoleRestrictionPage {
  constructor(private readonly page: Page) {}

  async clickRoleRestriction(): Promise<void> {
    await this.page.getByRole("button", { name: "Role Restrictions" }).click();
  }

  async selectUserRole(roleName: string): Promise<void> {
    await this.page.locator("#root_userRoleId").click();
    await this.page.getByRole("option", { name: roleName }).click();
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
