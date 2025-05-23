import 'server-only'
 
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'en' | 'nl') => {
  const dictLoader = dictionaries[locale];
  if (typeof dictLoader !== 'function') {
    throw new Error(`No dictionary found for locale: ${locale}`);
  }
  return await dictLoader();
}