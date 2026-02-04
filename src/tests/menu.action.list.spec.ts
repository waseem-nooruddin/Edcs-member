import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductPage } from "../pages/product.page";
import { UserManagementPage } from "../pages/user.management.page";
import { MenuActionListPage } from "../pages/menu.action.list.page";
import { credentials } from "./credentials/credentials";

test.describe("Menu Action List Page", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });
  test(
    "Verify Menu Action List page loads correctly",
    { tag: ["@smoke", "@TC_09", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      const menuActionListPage = new MenuActionListPage(page);
      await menuActionListPage.clickMenuActionList.call({ page });
      await expect(
        page.getByRole("heading", { name: "Menu Action List" }),
      ).toBeVisible();
      await menuActionListPage.searchMenuActionList.call({ page }, "284");
      await expect(page.getByText("284", { exact: false })).toBeVisible();
    },
  );
});
