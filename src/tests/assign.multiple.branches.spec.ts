import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductPage } from "../pages/product.page";
import { UserManagementPage } from "../pages/user.management.page";
import { AssignMultipleBranches } from "../pages/assign.multiple.branches.page";
import { credentials } from "./credentials/credentials";

test.describe("Menu Action List Page", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });
  test(
    "Verify Assigned default branch",
    { tag: ["@smoke", "@TC_18", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      const assignmultiplebranches = new AssignMultipleBranches(page);
      await assignmultiplebranches.navigateToAssignMultipleBranches();
    },
  );

    test(
    "Verify that can add a new branch",
    { tag: ["@smoke", "@TC_19", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      const assignmultiplebranches = new AssignMultipleBranches(page);
      await assignmultiplebranches.navigateToAssignMultipleBranches();
      await assignmultiplebranches.fillLoginId("Waseem Automation Test User");
    },
  );

    test(
    "Verify that can View all assigned divisions for a user",
    { tag: ["@smoke", "@TC_20", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickUserManagement();
      const assignmultiplebranches = new AssignMultipleBranches(page);
      await assignmultiplebranches.navigateToAssignMultipleBranches();
      await assignmultiplebranches.fillLoginId("Waseem Automation Test User");
      await assignmultiplebranches.addNewButton();
      await assignmultiplebranches.selectBrachDeptId();
      await assignmultiplebranches.slectBranch("999-HO - 03");
    },
  );  

});