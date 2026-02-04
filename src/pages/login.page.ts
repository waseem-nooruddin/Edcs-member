import { Page, Locator } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) { }

  async navigateToLoginPage() {
    await this.page.goto('http://qa-edcs-v1-1604665350.ap-southeast-1.elb.amazonaws.com/feauth/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#root_email', username);
    await this.page.fill('#root_password', password);
    await this.page.click('(//button[@class="MuiButtonBase-root MuiButton-root MuiButton-text iil-roundedbutton iil-btn--primary"])[1]');
  }
  async getErrorMessage(): Promise<string> {
    return await this.page.locator('//h3[@data-test="error"]').textContent() ?? '';
  }
}