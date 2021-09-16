export const truncateString = (str: string, numb: number = 15) =>
  str.length > numb ? str.slice(0, numb).concat('...') : str;
