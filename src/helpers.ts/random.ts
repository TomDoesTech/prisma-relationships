export function randomNumber(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sampleArray<T>(arr: Array<T>) {
  const count = randomNumber(1, arr.length - 1);

  return Array(count)
    .fill(null)
    .map(() => arr[randomNumber(0, arr.length - 1)]);
}
