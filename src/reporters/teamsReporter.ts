import { Reporter, TestCase, TestResult } from '@playwright/test';

export default class TeamsReporter implements Reporter {
  private webhookUrl: string | undefined;
  private testResults = {
    passed: 0,
    failed: 0,
    skipped: 0,
    flaky: 0,
    total: 0,
  };
  private testNames: { name: string; status: string }[] = [];

  constructor() {
    this.webhookUrl = process.env.TEAMS_WEBHOOK_URL;
    if (!this.webhookUrl) {
      console.warn('⚠️  TEAMS_WEBHOOK_URL environment variable is not set. Teams notifications will be skipped.');
    }
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.testResults.total++;

    if (result.status === 'passed') {
      this.testResults.passed++;
      this.testNames.push({ name: test.title, status: '✅' });
    } else if (result.status === 'failed') {
      this.testResults.failed++;
      this.testNames.push({ name: test.title, status: '❌' });
    } else if (result.status === 'skipped') {
      this.testResults.skipped++;
      this.testNames.push({ name: test.title, status: '⏭️' });
    }

    // Mark as flaky if retried and passed
    if (result.retry > 0 && result.status === 'passed') {
      this.testResults.flaky++;
    }
  }

  async onEnd(): Promise<void> {
    if (!this.webhookUrl) {
      console.log('Skipping Teams notification (no webhook URL configured)');
      return;
    }

    const successEmoji = this.testResults.failed === 0 ? '✅' : '❌';
    const failureMessage = this.testResults.failed > 0 ? `\n❌ **Failed: ${this.testResults.failed}**` : '';
    const flakyMessage = this.testResults.flaky > 0 ? `\n⚠️ **Flaky: ${this.testResults.flaky}**` : '';
    const skippedMessage = this.testResults.skipped > 0 ? `\n⏭️ **Skipped: ${this.testResults.skipped}**` : '';

    const messageCard = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      summary: `Playwright Test Results - ${successEmoji}`,
      themeColor: this.testResults.failed === 0 ? '28a745' : 'dc3545',
      sections: [
        {
          activityTitle: `${successEmoji} Playwright Automation Test Results`,
          facts: [
            { name: 'Total Tests:', value: `${this.testResults.total}` },
            { name: 'Passed:', value: `${this.testResults.passed}` },
            { name: 'Failed:', value: `${this.testResults.failed}` },
            { name: 'Skipped:', value: `${this.testResults.skipped}` },
            { name: 'Flaky:', value: `${this.testResults.flaky}` },
          ],
          markdown: true,
        },
      ],
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageCard),
      });

      if (!response.ok) {
        console.error(`Failed to send Teams notification: ${response.statusText}`);
      } else {
        console.log('✅ Teams notification sent successfully!');
      }
    } catch (error) {
      console.error('Error sending Teams notification:', error);
    }
  }
}
