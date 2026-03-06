export const getHash = (char: string, index: number) => {
  let hash = 0;
  const str = char + index.toString();
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};
