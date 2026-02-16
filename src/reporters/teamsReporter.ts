import { Reporter, FullResult } from '@playwright/test/reporter';
import * as https from 'https';

const TEAMS_WEBHOOK_URL = 'https://informaticsholdingsint.webhook.office.com/webhookb2/974efbea-f92a-4dba-bc66-4738ac5d6c76@b3f34b17-22f4-4962-adf1-6063e43d0d35/IncomingWebhook/925dfe521305400abdcbeafe21b056b7/59753863-8876-4c9e-9219-32589e04f46e/V26D0MZqdxfcT2JVJ2gQI51xcAT_uo5J7ZvBo4YdXbB501';

class TeamsReporter implements Reporter {
  async onEnd(result: FullResult) {
    const stats = result.stats;
    const status = result.status;

    const message = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      summary: `Playwright Test Results - ${status}`,
      themeColor: status === 'passed' ? '28a745' : status === 'failed' ? 'dc3545' : 'ffc107',
      sections: [
        {
          activityTitle: '🤖 Playwright Automation Test Report',
          activitySubtitle: `Status: ${status.toUpperCase()}`,
          facts: [
            {
              name: 'Total Tests',
              value: `${stats.expected}`,
            },
            {
              name: 'Passed',
              value: `${stats.expected - stats.unexpected - stats.flaky}`,
            },
            {
              name: 'Failed',
              value: `${stats.unexpected}`,
            },
            {
              name: 'Flaky',
              value: `${stats.flaky}`,
            },
            {
              name: 'Skipped',
              value: `${stats.skipped}`,
            },
            {
              name: 'Duration',
              value: `${Math.round(result.duration / 1000)} seconds`,
            },
          ],
          markdown: true,
        },
      ],
    };

    await this.sendToTeams(message);
  }

  private async sendToTeams(payload: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify(payload);
      const url = new URL(TEAMS_WEBHOOK_URL);

      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('✅ Test results sent to Teams successfully');
            resolve();
          } else {
            console.error(`❌ Failed to send to Teams. Status: ${res.statusCode}`);
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        console.error('❌ Error sending to Teams:', error.message);
        reject(error);
      });

      req.write(postData);
      req.end();
    });
  }
}

export default TeamsReporter;
