import randomstring from 'randomstring';

/**
 * @description Random string with length and charset
 * @param {Number} length
 * @param {String} charset
 * @param {Boolean} readable
 * @return {String} A random string
 */
 export const randomString = ({ length, charset, readable = false }) => {
    try {
      return randomstring.generate({ length, charset, readable });
    } catch (error) {
      return null;
    }
};

/**
 * @description Get number range [from, to] by input string, ex: "1,10" => [1,10]
 * @param {String} rangeString
 */
 export const getRangeNumberFromTo = (rangeString: string): [number, number] => {
  try {
    const [from, to] = rangeString.split(',').map(item => +item);

    // if (from > to) {
    //   throw LOGICAL_ERRORS.FROM_MUST_LESS_THAN_TO_IN_RANGE;
    // }

    if (typeof from === 'number' && typeof to === 'number') {
      return [from, to];
    }

    return [-1e4, 1e6];
  } catch (error) {
    throw error;
  }
};
