import { Page, Locator } from "@playwright/test";

export class RoleCreationPage {
 constructor(private readonly page: Page) {}
 
 async clickAddRoleCreation(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add New' }).click();
  }
 
async enterRoleName(roleName: string): Promise<void> {
    await this.page.locator("#root_userRoleName").fill(roleName);
  }

async enterRoleDescription(roleDescription: string): Promise<void> {
    await this.page.locator("#root_userRoleDesc").fill(roleDescription);
  }

}