export const loadFromCache = (key: string) => {
  return localStorage.getItem(key);
};

export const writeToCache = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};
