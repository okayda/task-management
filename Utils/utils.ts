export const addEllipsis = (inputString: string) => {
  if (inputString.length > 18) {
    return inputString.substring(0, 14) + "...";
  }
  return inputString;
};
