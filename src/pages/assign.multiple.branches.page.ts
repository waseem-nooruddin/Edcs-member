import { Page, Locator, expect } from "@playwright/test";

export class AssignMultipleBranches {
  constructor(private readonly page: Page) {}

  async navigateToAssignMultipleBranches(): Promise<void> {
    await this.page
      .getByRole("button", { name: "Assign Multiple Branches" })
      .click();
  }

  async selectUserId() {
    const userIdInput = this.page.locator("#root_userId input");

    await userIdInput.click();
  }

  async waitUntillUserId() {
    const userIdInput = this.page.getByRole("option");

    await userIdInput.hover();
  }

  async selectUser(loginId: string) {
    await this.page
      .getByRole("option")
      .filter({ hasText: loginId })
      .first()
      .click();
  }

  async addNewButton() {
    const addNewButton = this.page.getByRole("button", { name: "Add New" });
    await addNewButton.click();
  }

  async selectBranchDeptId() {
    await this.page.locator("#root_brachDeptId").click();
  }

  async slectBranch(value: string) {
    await this.page.getByRole("option").filter({ hasText: value }).click();
  }

  async clickSaveButton() {
    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async deleteData() {
    await this.page.getByRole("button", { name: "Delete" }).click();
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
}
