const { test, expect } = require('@playwright/test');

test('console error', async ({ page }) => {

  const messages = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      messages.push(`[${msg.type()}] ${msg.text()}`)
    }
  })

  page.on('pageerror', (error) => {
    messages.push(`[${error.name}] ${error.message}`)
  })

  // open index.html served by python -m http.server
  await page.goto('http://localhost:8000/');

  // we expect errors!
  expect(messages).not.toEqual([]);

});
