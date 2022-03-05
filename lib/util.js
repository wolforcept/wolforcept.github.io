/** pad an int string with left zeroes to match n digits in total */
const pad = (n, s) => ("000000000" + n).substr(("000000000" + n).length - s)

/** capitalize first letter of string */
const cap = (s) => s[0].toUpperCase() + s.substr(1)

/** find first on array that ensures comparison */
const firstThat = (arr, comp, i = 0) => { do { v = arr[i++] } while (!comp(v)) return v }

/** divide an array into subarrays */
let groupBy = (arr, n) => {
    let result = [];
    for (let i = 0; i < arr.length; i += n) result.push(arr.slice(i, i + n));
    return result;
};