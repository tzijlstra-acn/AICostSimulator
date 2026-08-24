'use client';

import { useState } from 'react';

interface CompanyLogoProps {
  domain: string;
  name: string;
  size?: number;
  className?: string;
}

// Map domain → gilbarbara/logos slug (https://github.com/gilbarbara/logos)
const DOMAIN_TO_LOGO: Record<string, string> = {
  'sap.com': 'sap',
  'siemens.com': 'siemens',
  'volkswagen.com': 'volkswagen',
  'deutschebank.com': 'deutsche-bank',
  'allianz.com': 'allianz',
  'hsbc.com': 'hsbc',
  'bt.com': 'bt',
  'rolls-royce.com': 'rolls-royce',
  'astrazeneca.com': 'astrazeneca',
  'lloydsbank.com': 'lloyds-bank',
  'shell.com': 'shell',
  'unilever.com': 'unilever',
  'microsoft.com': 'microsoft',
  'google.com': 'google',
  'amazon.com': 'aws',
  'aws.amazon.com': 'aws',
  'snowflake.com': 'snowflake',
  'github.com': 'github',
  'capgemini.com': 'capgemini',
  'deloitte.com': 'deloitte',
  'infosys.com': 'infosys',
  'accenture.com': 'accenture',
  'ibm.com': 'ibm',
  'oracle.com': 'oracle',
  'salesforce.com': 'salesforce',
  'servicenow.com': 'servicenow',
  'workday.com': 'workday',
  'bnpparibas.com': 'bnp-paribas',
  'airbus.com': 'airbus',
  'lvmh.com': 'lvmh',
  'loreal.com': 'loreal',
  'philips.com': 'philips',
  'asml.com': 'asml',
  'ing.com': 'ing',
  'abn-amro.com': 'abn-amro',
  'ericsson.com': 'ericsson',
  'h-and-m.com': 'h-and-m',
  'spotify.com': 'spotify',
  'klarna.com': 'klarna',
  'nordea.com': 'nordea',
  'santander.com': 'santander',
  'bbva.com': 'bbva',
  'telefonica.com': 'telefonica',
  'unicredit.com': 'unicredit',
  'intesasanpaolo.com': 'intesa-sanpaolo',
  'alstom.com': 'alstom',
  'pko.pl': 'pko',
  'pkn-orlen.pl': 'orlen',
  'telekom.com': 'deutsche-telekom',
  'deutschetelekom.com': 'deutsche-telekom',
  // Extended target company coverage
  'vodafone.co.uk': 'vodafone',
  'vodafone.com': 'vodafone',
  'baesystems.com': 'bae-systems',
  'arm.com': 'arm',
  'bosch.com': 'bosch',
  'bayer.com': 'bayer',
  'basf.com': 'basf',
  'db.com': 'deutsche-bank',
  'booking.com': 'bookingdotcom',
  'wolterskluwer.com': 'wolters-kluwer',
  'nxp.com': 'nxp-semiconductors',
  'axa.com': 'axa',
  'totalenergies.com': 'total',
  'orange.com': 'orange',
  'se.com': 'schneider-electric',
  'societegenerale.com': 'societe-generale',
  'ubs.com': 'ubs',
  'roche.com': 'roche',
  'novartis.com': 'novartis',
  'zurich.com': 'zurich-insurance',
  'abb.com': 'abb',
  'nestle.com': 'nestle',
  'abnamro.com': 'abn-amro',
  'sage.com': 'sage',
};

const CDN = 'https://cdn.jsdelivr.net/npm/@gilbarbara/logos@0.17/logos';

export function CompanyLogo({ domain, name, size = 32, className }: CompanyLogoProps) {
  const slug = DOMAIN_TO_LOGO[domain];
  const [failed, setFailed] = useState(false);
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const fallback = (
    <div
      style={{
        width: size,
        height: size,
        background: 'var(--lunar-elevated)',
        border: '1px solid var(--lunar-border-subtle)',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.3,
        fontWeight: 700,
        color: 'var(--lunar-text-muted)',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );

  if (!slug || failed) return fallback;

  return (
    <div
      style={{ width: size, height: size, flexShrink: 0 }}
      className={`relative rounded-md overflow-hidden ${className ?? ''}`}
    >
      <img
        src={`${CDN}/${slug}.svg`}
        alt={name}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain', background: '#fff', padding: 3, borderRadius: 6 }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
