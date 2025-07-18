import 'server-only'
 

export const getDictionary = async (locale: string) => {
  return (await import(`./dictionaries/${locale}.json`)).default;
};