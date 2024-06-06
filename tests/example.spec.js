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

  await page.goto('/');

  // get h1 text
  const h1 = await page.$('h1');
  console.log(await h1.textContent());

  // we expect errors!
  await expect.poll(() => messages).not.toEqual([])
  console.log(messages)
});
