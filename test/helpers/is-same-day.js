// Whether `one` and `two` are the same date or not
export default function isSameDay(one, two) {
  return one.toDateString() === two.toDateString();
}
