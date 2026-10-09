import { releaseEnvironment } from './environment.mjs';

const env = releaseEnvironment();
if (process.argv.includes('--if-production') && env.RECAP_RELEASE !== 'true') {
  console.log('Preview build: beta invitations may remain pending.');
  process.exit(0);
}

const missing = [];
if (!/^https:\/\/testflight\.apple\.com\/join\/[A-Za-z0-9]+\/?$/.test((env.PUBLIC_TESTFLIGHT_URL ?? '').trim())) {
  missing.push('PUBLIC_TESTFLIGHT_URL: a real public TestFlight invitation is required.');
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((env.PUBLIC_CONTACT_EMAIL ?? '').trim())) {
  missing.push('PUBLIC_CONTACT_EMAIL: a public contact email is required.');
}
if (env.BETA_FEATURES_VERIFIED !== 'true') missing.push('BETA_FEATURES_VERIFIED: verify the advertised features in the public beta.');
if (env.LEGAL_CONTENT_APPROVED !== 'true') missing.push('LEGAL_CONTENT_APPROVED: review both localized legal documents.');
if (missing.length) {
  console.error('Production release is not ready:\n' + missing.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}
console.log('Production inputs are present. Verify the invitation and domain live before launch.');
