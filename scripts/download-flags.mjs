import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const flags = [
  'gb','de','nl','fr','ch','se','dk','fi','no',
  'es','it','pl','at','be','ie','lu','pt','cz',
  'hu','ro','gr','sk','hr','si','ee','lv','lt'
];

mkdirSync(join(process.cwd(), 'public/flags'), { recursive: true });

for (const code of flags) {
  try {
    const res = await fetch(`https://flagcdn.com/w40/${code}.png`);
    if (!res.ok) { console.log(`Skipping ${code}: ${res.status}`); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(process.cwd(), `public/flags/${code}.png`), buf);
    console.log(`Downloaded ${code}.png`);
  } catch (e) {
    console.log(`Error ${code}: ${e.message}`);
  }
}
console.log('Flags done');
