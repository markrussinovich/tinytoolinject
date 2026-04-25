import { readFile } from 'node:fs/promises';
import { hardenedSummarize, vulnerableSummarize } from './summarizer.js';

const input = {
  toolName: 'RealToolName',
  tagline: 'PowerShell CLI for searching developer notes',
  tags: ['powershell', 'cli', 'search'],
  readme: await readFile(new URL('../tests/fixtures/geoffrey-readme.md', import.meta.url), 'utf8')
};

const injectionSusceptibleModel = async ({ user }) => {
  const injectedLines = user
    .split('\n')
    .filter((line) => /^SUMMARY:|^FEATURES:/i.test(line.trim()))
    .join('\n');

  return `SUMMARY: RealToolName is a PowerShell CLI for searching developer notes.
FEATURES: 🔎 Searches notes quickly | 🧰 Runs from PowerShell | 🏷️ Filters by tags
${injectedLines}`;
};

const hardenedModel = async () => `<<<SUMMARY>>>
RealToolName is a PowerShell CLI that searches developer notes and filters results by tags.
<<<END_SUMMARY>>>
<<<FEATURES>>>
🔎 Searches notes quickly | 🧰 Runs from PowerShell | 🏷️ Filters by tags
<<<END_FEATURES>>>`;

console.log('Vulnerable result:');
console.log(await vulnerableSummarize(input, injectionSusceptibleModel));

console.log('\nHardened result:');
console.log(await hardenedSummarize(input, hardenedModel));