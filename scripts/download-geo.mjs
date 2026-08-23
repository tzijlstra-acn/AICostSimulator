import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Use Natural Earth 110m countries, filtered to Europe
// Source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson
// License: Public Domain

const url = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';

const europeanISO2 = [
  // EU-27
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU',
  'IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE',
  // Non-EU scope
  'GB','CH','NO','IS','LI','AL','BA','RS','ME','MK','XK',
  // Eastern context
  'MD','UA','BY','RU',
  // Southern context
  'TR','GE','AM','AZ',
  // North Africa (south Mediterranean context)
  'MA','DZ','TN'
];

console.log('Fetching GeoJSON from Natural Earth...');
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}
const data = await response.json();

const NAME_TO_ISO2 = {
  'France': 'FR',
  'Norway': 'NO',
  'Switzerland': 'CH',
  'Kosovo': 'XK',
  'Serbia': 'RS',
  'Bosnia and Herz.': 'BA',
  'North Macedonia': 'MK',
  'Montenegro': 'ME',
  'Georgia': 'GE',
  'Armenia': 'AM',
  'Azerbaijan': 'AZ',
  'Morocco': 'MA',
  'Algeria': 'DZ',
  'Tunisia': 'TN',
};

const getISO2 = (f) => {
  if (f.properties.ISO_A2 && f.properties.ISO_A2 !== '-99') return f.properties.ISO_A2;
  return NAME_TO_ISO2[f.properties.NAME] ?? null;
};

const filtered = {
  type: 'FeatureCollection',
  features: data.features.filter(f =>
    europeanISO2.includes(getISO2(f))
  ).map(f => ({
    type: 'Feature',
    properties: {
      ISO_A2: getISO2(f) ?? f.properties.ISO_A2,
      ISO_A3: f.properties.ISO_A3,
      NAME: f.properties.NAME,
      NAME_LONG: f.properties.NAME_LONG,
    },
    geometry: f.geometry
  }))
};

mkdirSync(join(process.cwd(), 'public/maps'), { recursive: true });
writeFileSync(join(process.cwd(), 'public/maps/europe.geojson'), JSON.stringify(filtered));
console.log(`Saved ${filtered.features.length} countries to public/maps/europe.geojson`);
