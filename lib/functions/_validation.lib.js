import { emailRegex } from "../regex";

const ZERO = 0;

export const checkInputLength = (str, length) => {
  try {
    if (str?.length <= length) {
      return false; // string is valid
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const giveErrorOnEmptyString = (str) => {
  try {
    return str?.length === ZERO;
  } catch (error) {
    return true;
  }
};

export const checkValidEmail = (email) => {
  try {
    // if valid return true else false
    return emailRegex.test(email);
  } catch (error) {
    return false;
  }
};
