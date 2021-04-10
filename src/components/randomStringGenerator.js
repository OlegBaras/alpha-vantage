const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
const allNumbers = [..."0123456789"];

const all = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha];

export function randomStringGenerator(len, base = all) {
  return [...Array(len)]
    .map((i) => base[(Math.random() * base.length) | 0])
    .join("");
}
