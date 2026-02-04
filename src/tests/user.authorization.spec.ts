import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductPage } from "../pages/product.page";
import { UserManagementPage } from "../pages/user.management.page";
import { UserAuthorization } from "../pages/user.authorization.page";
import { credentials } from "./credentials/credentials";

test.describe("User Authorization", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test(
    "Verify newly created user is displayed in User Authorization page",
    { tag: ["@smoke", "@TC_10", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      const userAuthorization = new UserAuthorization(page);
      await userAuthorization.clickUserAuthorization();
      await userAuthorization.verifyUserAuthorizationPage();
      await userAuthorization.searchingUser("11434");
    },
  );

  test(
    "Verify authorize button is available for pending users",
    { tag: ["@smoke", "@TC_11", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      const userAuthorization = new UserAuthorization(page);
      await userAuthorization.clickUserAuthorization();
      await userAuthorization.verifyPendingUser();
    },
  );

  test(
    "Verify successful authorization of user",
    { tag: ["@smoke", "@TC_12", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await UserManagementPage.prototype.clickUserManagement.call({ page });
      const userAuthorization = new UserAuthorization(page);
      await userAuthorization.clickUserAuthorization();
      await userAuthorization.verifyPendingUser();
      await userAuthorization.authorizeUser();
    },
  );
});
