import { execSync } from "child_process";
import * as fs from "fs";

let chromePath: string | null = null;

export function getChromePath(): string {
  if (chromePath) {
    return chromePath;
  }

  // Try to find Chrome/Chromium in various locations
  const possiblePaths = [
    '/nix/store/zi4f80l169xlmivz8vja8wlphq74qqk0-chromium-125.0.6422.141/bin/chromium',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable'
  ];

  // Try to find using 'which' command
  try {
    const paths = ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable'];
    for (const cmd of paths) {
      try {
        const result = execSync(`which ${cmd}`, { encoding: 'utf8' }).trim();
        if (result) {
          chromePath = result;
          return chromePath;
        }
      } catch (e) {
        // Continue to next command
      }
    }
  } catch (e) {
    // Continue to manual path checking
  }

  // Try predefined paths
  for (const path of possiblePaths) {
    try {
      if (fs.existsSync(path)) {
        chromePath = path;
        return chromePath;
      }
    } catch (e) {
      // Continue to next path
    }
  }

  throw new Error('Chrome/Chromium browser not found. Please ensure it is installed.');
}

export const chromeBrowserConfig = {
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-extensions',
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows'
  ]
};