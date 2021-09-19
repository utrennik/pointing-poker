export const truncateString = (str: string, numb: number = 15) =>
  str.length > numb ? str.slice(0, numb).concat('...') : str;

export const filterIDfromURL = (URLOrID: string) => {
  const regex = /link\//i;
  if (regex.test(URLOrID)) {
    return URLOrID.split(regex)[1];
  }
  return URLOrID;
};
