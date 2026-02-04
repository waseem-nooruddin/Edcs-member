import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductPage } from "../pages/product.page";
import { UserManagementPage } from "../pages/user.management.page";
import { credentials } from "./credentials/credentials";

test.describe("User Page", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test(
    "Verify navigation to New User ID Creation screen",
    { tag: ["@smoke", "@TC_06", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      await userManagementPage.navigateToUserPage();
      await expect(page.getByRole("link", { name: "Users" })).toBeVisible();
    },
  );

  test(
    "Verify validation of Login ID and auto-population of user details",
    { tag: ["@smoke", "@TC_07", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      await userManagementPage.navigateToUserPage();
      await userManagementPage.clickAddNewUser();
      await userManagementPage.enterLoginID("10011");
      const empNumber = await page.locator("#root_empNumber").inputValue();
      expect(empNumber).toBe("");
      await userManagementPage.enterValidateId();
    },
  );

  test(
    "Verify successful creation of new user with selected role",
    { tag: ["@smoke", "@TC_08", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      await userManagementPage.navigateToUserPage();
      await userManagementPage.clickAddNewUser();
      await userManagementPage.enterLoginID("10011");
      await userManagementPage.enterValidateId();
      await userManagementPage.enterUserRoleId();
      await userManagementPage.enterSubmitButton();
    },
  );

  test(
    "Verify newly created user is displayed in View All Users grid",
    { tag: ["@smoke", "@TC_09", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      await userManagementPage.navigateToUserPage();
      await expect(page.getByRole("link", { name: "Users" })).toBeVisible();
      await expect(page.getByText("10011")).toBeVisible();
    },
  );
});
