import { Page, Locator, expect } from "@playwright/test";

export class AssignMultipleBranches {
  constructor(private readonly page: Page) {}

  async navigateToAssignMultipleBranches(): Promise<void> {
    await this.page
      .getByRole("button", { name: "Assign Multiple Branches" })
      .click();
  }

  async fillLoginId(loginId: string) {
    await this.page.getByPlaceholder("Search by Login ID...").fill(loginId);
    await this.page.getByText(loginId, { exact: true }).click();
  }

  async addNewButton() {
  const addNewButton = this.page.getByRole('button', { name: 'Add New' });
  }

  async selectBrachDeptId() {
    await this.page.locator('#root_brachDeptId').click
  }

  async slectBranch(value: string) {
    await this.page.locator(`li[data-value="${value}"]`).click();

  }
}
