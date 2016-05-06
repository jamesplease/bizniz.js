// Accepts a string in `YYYY-MM-DD` format,
// returns a new Date
export default function generateDate(str) {
  if (str instanceof Date) {
    return new Date(str.getTime());
  }
  const values = str.split('-');
  return new Date(values[0], values[1] - 1, values[2]);
}
