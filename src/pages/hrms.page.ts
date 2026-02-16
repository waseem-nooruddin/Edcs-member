import { Page, expect } from "@playwright/test";
import path from "path";

export class HrmsPage {
  constructor(private page: Page) {}

  // ================= Personal Details =================

  async selectHRMS() {
    await this.page
      .locator(
        "//div[contains(@class,'MuiCard-root') and .//p[normalize-space()='HRMS']]",
      )
      .click();
  }

  async clickRegisterEmployee() {
    await this.page
      .locator(
        "//div[@role='button' and .//p[normalize-space()='Register Employee']]",
      )
      .click();
  }

  async clickAddNew() {
    await this.page
      .locator("//button[.//span[normalize-space()='Add New']]")
      .click();
  }

  async selectTitle() {
    await this.page.locator("#root_title").click();
    await this.page
      .locator("//li[@role='option' and normalize-space()='Mr.']")
      .click();
  }

  async enterFullName(fullName: string) {
    await this.page.fill("#root_fullName", fullName);
  }

  async enterInitials(initials: string) {
    await this.page.fill("#root_initials", initials);
  }

  async enterSurName(surName: string) {
    await this.page.fill("#root_surName", surName);
  }

  async selectGender() {
    await this.page.locator("#root_gender").click();
    await this.page
      .locator("//li[@role='option' and @data-value='male']")
      .click();
  }

  async enterDOB(dob: string) {
    await this.page.fill("#root_dob", dob);
  }

  async enterPlaceOfBirth(place: string) {
    await this.page.fill("#root_placeOfBirth", place);
  }

  async selectBloodGroup() {
    await this.page.locator("#root_bloodGroup").click();
    await this.page.locator("//li[@data-value='A-']").click();
  }

  async enterNIC(nic: string) {
    await this.page.fill("#root_nicNo", nic);
  }

  async enterNicIssueDate(date: string) {
    await this.page.fill("#root_nicIssuedDate", date);
  }

  async enterMaritalStatus(status: "Married") {
    await this.page.locator("#root_civilStatus").click();
    await this.page.getByRole("option", { name: "Unmarried" }).click();
  }

  async clickSave() {
    await this.page
      .locator("//button[.//span[normalize-space()='SAVE']]")
      .click();
  }

  async clickNext() {
    await this.page
      .locator("//button[.//span[normalize-space()='NEXT']]")
      .click();
  }

  // ================= Employment Details =================

  async enterEmployeeNumber(enumber: string) {
    await this.page.fill("#root_empNumber", enumber);
  }

  async enterEmployeeEpfNumber(epf: string) {
    await this.page.fill("#root_epfNumber", epf);
  }

  async selectBranch(Branch: string) {
    await this.page.locator("#root_organizationDetails").click();
    await this.page.getByRole("option", { name: Branch }).click();
  }

  async selectDivision(Division: string) {
    await this.page.locator("#root_department").click();
    await this.page.getByRole("option", { name: Division }).click();
  }

  async selectResignedTerrminated(Resigned: string) {
    await this.page.locator("#root_isResignedTerrminated").click();
    await this.page.getByRole("option", { name: Resigned }).click();
  }

  async selectEmployeeType(EmployeeType: string) {
    await this.page.locator("#root_employeeType").click();
    await this.page.getByRole("option", { name: EmployeeType }).click();
  }

  async enterDateOfJoin(date: string) {
    await this.page.locator("#root_dateOfJoined").click();
    await this.page.locator("#root_dateOfJoined").fill(date);
  }

  async enterNoticeDate() {
    await this.page.locator("#root_workShipCategoryId").click();
  }

  async selectNoticePeriod(NoticeDate: string) {
    await this.page.getByRole("option", { name: NoticeDate }).click();
  }
}
