export function getImageUrl(name: string) {
  return new URL(`/src/assets/actions/${name}.png`, import.meta.url).href;
}