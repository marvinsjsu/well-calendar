export function connected () {
  return fetch('favicon.ico')
    .then(() => true).catch((error) => false);
}