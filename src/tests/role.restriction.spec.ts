import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductPage } from "../pages/product.page";
import { UserManagementPage } from "../pages/user.management.page";
import { RoleRestrictionPage } from "../pages/role.restriction.page";
import { credentials } from "./credentials/credentials";

test.describe("Menu Action List Page", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test(
    "Verify user page loads correctly",
    { tag: ["@smoke", "@TC_25", "@positive1"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      const roleRestrictionPage = new RoleRestrictionPage(page);
      await roleRestrictionPage.clickRoleRestriction();
    },
  );

  test(
    "Verify role selection and display of existing allowed actions",
    { tag: ["@smoke", "@TC_26", "@positive1"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      const roleRestrictionPage = new RoleRestrictionPage(page);
      await roleRestrictionPage.clickRoleRestriction();
      await roleRestrictionPage.searchRoleRestriction("284");
      await expect(
        page.getByRole("heading", { name: "Role Restriction" }),
      ).toBeVisible();
    },
  );

  test(
    "Verify adding a new allowed action to a role",
    { tag: ["@smoke", "@TC_27", "@positive1"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      const roleRestrictionPage = new RoleRestrictionPage(page);
      await roleRestrictionPage.clickRoleRestriction();
      await roleRestrictionPage.searchRoleRestriction("284");
      await expect(
        page.getByRole("heading", { name: "Role Restriction" }),
      ).toBeVisible();
      await roleRestrictionPage.checkboxSelection();
      await roleRestrictionPage.enterSubmitButton();
    },
  );

  test(
    "Verify restricting (removing) an existing action from a role",
    { tag: ["@smoke", "@TC_28", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      const roleRestrictionPage = new RoleRestrictionPage(page);
      await roleRestrictionPage.clickRoleRestriction();
      await roleRestrictionPage.searchRoleRestriction("284");
      await expect(
        page.getByRole("heading", { name: "Role Restriction" }),
      ).toBeVisible();
      await roleRestrictionPage.enterRemoveExistingId();
    },
  );
});
