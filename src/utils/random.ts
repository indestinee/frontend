export const randomStr = (size: number) => {
  let s = '';
  while (s.length < size) {
    s += Math.random().toString(36).substring(2, 15);
  }
  return s.substring(0, size);
};

export const randomIntArray = (length: number, max: number) => {
  return Array.from({length}, () => Math.floor(Math.random() * max));
};
