import seedRandom from 'seed-random'

const IOTA = 0.00000000000001
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

export const makeRandom = (seed: string = Math.random().toString()) => {
  const randomizer = seedRandom(seed)
  const random = () => randomizer() * (1 - IOTA) + IOTA // ensure non-zero result

  const r = {
    integer: (min = 0, max = 10) => Math.floor(r.decimal(min, max)),

    decimal: (min = 0, max = 1) => random() * (max - min) + min,

    normal: (min = 0, max = 1): number => {
      const u = random()
      const v = random()
      let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
      num = num / 10.0 + 0.5 // Translate to 0 -> 1
      if (num > 1 || num < 0) return r.normal(min, max) // try again if out of bounds
      return num * (max - min) + min
    },

    probability: (percent: number) => random() < percent,

    coinFlip: () => r.probability(0.5),

    plusOrMinus: () => (r.coinFlip() ? 1 : -1),

    pick: <T>(obj: T[] | Record<string | number, T>): T => {
      if (Array.isArray(obj)) {
        // return random element of an array
        const key = r.integer(0, obj.length)
        return obj[key]
      } else {
        // return random property of an object
        const key = r.pick(Object.keys(obj))
        return obj[key]
      }
    },

    alpha: (length = 5) => new Array(length).fill(null).reduce(_ => _ + r.pick(ALPHABET), ''),

    shuffle: <T>(arr: T[]): T[] => {
      const result = [...arr]
      return result.sort(() => r.plusOrMinus())
    },

    sample: <T>(arr: T[], size = 1): T[] => {
      const result = r.shuffle(arr)
      return result.slice(0, size)
    },
  }

  return r
}

export type Randomizer = ReturnType<typeof makeRandom>
