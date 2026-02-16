import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { NavBarPage } from "../pages/navbar.page";
import { credentials } from "./resources/credentials";
import { EmployeeRegistration } from "../pages/employee.registration.page";
import { testdata } from "./resources/testdata";
import { HrmsPage } from "../pages/hrms.page";

test.describe("Employee Registration", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });
  test(
    "Verify access to Employee Registration form",
    { tag: ["@smoke", "@TC_01", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const navBarpage = new NavBarPage(page);
      await navBarpage.openHrmsModule();
      const employeeRegistration = new EmployeeRegistration(page);
      await employeeRegistration.clickRegisterEmployee();
      expect(
        page.getByRole("heading", { name: "Employee Registration List" }),
      ).toBeVisible();
      
    },
  );

  test(
    "Create employee with all mandatory fields",
    { tag: ["@smoke", "@TC_02", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const navBarpage = new NavBarPage(page);
      await navBarpage.openHrmsModule();
      const hrmsPage = new HrmsPage(page);
      await hrmsPage.clickRegisterEmployee();
      await hrmsPage.clickAddNew();
      await hrmsPage.selectTitle();
      await hrmsPage.enterFullName(testdata.hrms_enterFullName);
      await hrmsPage.enterSurName(testdata.hrms_enterSurName);
      await hrmsPage.selectGender();
      await hrmsPage.enterDOB(testdata.hrms_dateOfBirth);
      await hrmsPage.enterPlaceOfBirth(testdata.hrms_placeOfBirth);
      await hrmsPage.selectBloodGroup();
      await hrmsPage.enterNIC(testdata.hrms_nic);
      await hrmsPage.enterNicIssueDate(testdata.hrms_nicDateOfIssue);
      await hrmsPage.enterMaritalStatus('Married');
      await hrmsPage.clickNext();

      await hrmsPage.enterEmployeeNumber(testdata.Employee_Number);
      await hrmsPage.enterEmployeeEpfNumber(testdata.Emplloyee_EPFNumber);
      await hrmsPage.selectBranch(testdata.branchName);
      await hrmsPage.selectDivision(testdata.Division);
      await hrmsPage.selectResignedTerrminated(testdata.Resigned);
      await hrmsPage.selectEmployeeType(testdata.EmployeeType);
      await hrmsPage.enterDateOfJoin(testdata.hrms_dateOfJoin);
      await hrmsPage.enterNoticeDate();
      //await hrmsPage.selectNoticePeriod(testdata.hrms_noticeDate);
      // await hrmsPage.selectPriorNoticePeriod();
    },
  );
});
