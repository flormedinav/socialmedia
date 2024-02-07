export const checkString = (inputString) => {
  if (!inputString || inputString?.trim() === "") {
    return "-";
  } else {
    return inputString;
  }
};

export const truncateString = (inputString) => {
  if (!inputString || inputString?.trim() === "") {
    return "-";
  } else if (inputString.length > 30) {
    return inputString.slice(0, 30) + "...";
  } else {
    return inputString;
  }
};

export const stringToZero = (inputString) => {
  if (!inputString) {
    return "0";
  } else {
    return inputString;
  }
};

export const getInitials = (firstName, lastName) => {
  if (!firstName || !lastName) {
    return "-";
  } else {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  }
};
