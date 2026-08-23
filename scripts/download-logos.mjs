import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Map partner name to domain for logo lookup
const PARTNER_DOMAINS = {
  'AWS Europe': 'amazon.com',
  'Microsoft Azure (EU regions)': 'microsoft.com',
  'Google Cloud (EU regions)': 'google.com',
  'Deutsche Telekom / T-Systems': 'telekom.de',
  'BT Group / EE Business': 'bt.com',
  'Capgemini': 'capgemini.com',
  'SAP': 'sap.com',
  'GitHub / Microsoft': 'github.com',
  'Snowflake': 'snowflake.com',
  'EU University AI Research Network': null, // no logo available
};

mkdirSync(join(process.cwd(), 'public/logos'), { recursive: true });

let downloaded = 0;
let skipped = 0;

for (const [name, domain] of Object.entries(PARTNER_DOMAINS)) {
  if (!domain) { console.log(`Skipping ${name}: no domain`); skipped++; continue; }
  try {
    const res = await fetch(`https://logo.clearbit.com/${domain}?size=64`);
    if (!res.ok) { console.log(`Skipping ${name}: ${res.status}`); skipped++; continue; }
    const contentType = res.headers.get('content-type') ?? '';
    const ext = contentType.includes('svg') ? 'svg' : 'png';
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(process.cwd(), `public/logos/${slug}.${ext}`), buf);
    console.log(`Downloaded ${slug}.${ext}`);
    downloaded++;
  } catch (e) {
    console.log(`Error ${name}: ${e.message}`);
    skipped++;
  }
}
console.log(`Logos done: ${downloaded} downloaded, ${skipped} skipped`);
