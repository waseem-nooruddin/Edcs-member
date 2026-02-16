import { Page, Locator, expect } from "@playwright/test";

export class EmployeeRegistration {
  constructor(private readonly page: Page) {}

  async clickRegisterEmployee(): Promise<void> {
    await this.page.getByText("Register Employee").click();
  }

  async clickEmployeeRegistrationAddNew(): Promise<void> {
    await this.page.getByRole("button", { name: "Add New" }).click();
  }

  async enterEmployeeTitle(title: string): Promise<void> {
    await this.page.locator("#root_title").click();
    await this.page.getByRole("option", { name: title }).click();
  }

  async enterFullName(fullName: string): Promise<void> {
    const input = this.page.locator("#root_fullName");

    await expect(input).toBeVisible();
    await input.fill(fullName);
  }

  async enterSurName(surName: string): Promise<void> {
    const input = this.page.locator("#root_surName");

    await expect(input).toBeVisible();
    await input.fill(surName);
  }

  async enterSalutation(salutation: string): Promise<void> {
    await this.page.fill("#root_salName", salutation);
  }

  async selectGender(gender: string): Promise<void> {
    await this.page.locator("#root_gender").click();

    await this.page.getByRole("option", { name: gender }).click();
  }

  async selectMaleGender(Gender: string): Promise<void> {
    await this.page.getByRole("option", { name: Gender }).click();
  }

  async enterDOB(dob: string) {
    // dob format depends on your app, e.g., '1990-05-25' or '25/05/1990'
    await this.page.locator("#root_dob").fill(dob);
  }

  async enterPlaceOfBirth(place: string) {
    await this.page.locator("#root_placeOfBirth").fill(place);
  }

  async selectBloodGroup(bloodGroup: string) {
    // Click the dropdown to open options
    await this.page.locator("#root_bloodGroup").click();

    // Click the option that matches the blood group
    await this.page
      .locator(`//li[@role='option' and normalize-space()='${bloodGroup}']`)
      .click();
  }
}
