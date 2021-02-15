import seedRandom from 'seed-random';

const IOTA = 0.00000000000001;

export const makeRandom = (seed: string | undefined) => {
  const randomizer = seedRandom(seed);
  const random = () => randomizer() * (1 - IOTA) + IOTA; // ensure non-zero result
  const r = {
    integer: (min: number, max: number) => Math.floor(r.decimal(min, max)),

    decimal: (min: number, max: number) => random() * (max - min + 1) + min,

    normal: (min: number, max: number, skew = 1) => {
      let num =
        Math.sqrt(-2.0 * Math.log(random())) *
        Math.cos(2.0 * Math.PI * random());

      num = num / 10.0 + 0.5; // Translate to 0 -> 1
      if (num > 1 || num < 0) num = r.normal(min, max, skew); // resample between 0 and 1 if out of range
      num = Math.pow(num, skew); // Skew
      num *= max - min; // Stretch to fill range
      num += min; // offset to min
      return num;
    },

    coinFlip: () => r.integer(0, 1) === 0,

    probability: (percent: number) => random() < percent,

    pick: (obj: any[] | { [key: string]: any }): any => {
      if (Array.isArray(obj)) {
        // return random element of an array
        return obj[r.integer(0, obj.length - 1)];
      } else {
        // return random property of an object
        return obj[r.pick(Object.keys(obj))];
      }
    },

    plusOrMinus: () => r.pick([-1, 1]),
  };

  return r;
};

export type Randomizer = ReturnType<typeof makeRandom>;
